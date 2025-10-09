#!/usr/bin/env bash

# Add error handler so we know where error has occurred
set -eE -o functrace
failure() {
  local lineno=$1
  local msg=$2
  echo "Failed at $lineno: $msg"
}
trap 'failure ${LINENO} "$BASH_COMMAND"' ERR

DRY_RUN=0
CUSTOM_RELEASE_NOTES=0
# Parse parameters
while [[ $# -gt 0 ]]; do
    case $1 in
    --dry-run)
        DRY_RUN=1
        shift # past argument
        ;;
    --minor)
        MINOR_VERSION="$2"
        shift # past argument
        shift # past value
        ;;
    --major)
        MAJOR_VERSION="$2"
        shift # past argument
        shift # past value
        ;;
    --type)
        TYPE="$2"
        shift # past argument
        shift # past value
        ;;
    --custom-release-notes)
        CUSTOM_RELEASE_NOTES=1
        shift # past argument
        ;;
    -*)
        echo "Unknown option $1"
        echo
        echo "$0 usage:"
        echo "  --dry-run  : do not do anything, just print gh command which will be used"
        echo "  --major    : MAJOR version to use e.g. 1 in 1.2.3."
        echo "  --minor    : MINOR version to use e.g. 2 in 1.2.3."
        echo "  note       : PATCH version will be AUTO-incremented"
        echo "  --type     : type of release, either 'snapshot' (default) or 'release'"
        echo "  --custom-release-notes : use release notes from docs/releases for publish, default is github's auto-generated notes"
        exit 1
        ;;
    *)
        POSITIONAL_ARGS+=("$1") # save positional arg
        shift # past argument
        ;;
    esac
done

# Require both --minor and --major params
if [ -z "${MINOR_VERSION}" ] || [ -z "${MAJOR_VERSION}" ]; then
    echo "Provide minor and major version e.g. $0 --major 1 --minor 0"
    exit 1
fi
TIMESTAMP=$(date -u +%Y-%m-%d-%H-%M)
# Get last ONE non-draft non-prerelease version (sorted by data created desc)
LAST_VERSION=$(gh release list --exclude-drafts --exclude-pre-releases --json name --jq '.[0].name' --limit 1 | tr -d '[:space:]')

echo "Last non-snapshot version: ${LAST_VERSION}"
if [[ $(echo -n "${LAST_VERSION}" | wc -c | tr -d '[:space:]') -eq 0 ]]; then
    echo "No last non-snapshot-version, assuming PATCH_VERSION=0"
    PATCH_VERSION=0
else
    # Split string by '.'
    IFS='.' read -ra ADDR <<< "${LAST_VERSION}"
    PATCH_VERSION=${ADDR[2]}
    # Increment patch version
    PATCH_VERSION=$((PATCH_VERSION + 1))
    echo "Getting patch version from last released version, PATCH_VERSION=${PATCH_VERSION}"
fi

if [[ "${TYPE}" == "release" ]]; then
    echo "Type of release: Final release"
    VERSION="v${MAJOR_VERSION}.${MINOR_VERSION}.${PATCH_VERSION}"
    PARAM_PRE=""
else
    echo "Type of release: Snapshot"
    VERSION="v${MAJOR_VERSION}.${MINOR_VERSION}.${PATCH_VERSION}.snapshot-${TIMESTAMP}"
    PARAM_PRE="--prerelease"
fi

echo "Will publish artifacts to release with version: ${VERSION}"

PARAM_NOTES="--generate-notes"
if [ "${CUSTOM_RELEASE_NOTES}" -eq 1 ]; then
    NOTES_FILE="docs/releases/${VERSION}.md"
    if [ ! -f "${NOTES_FILE}" ]; then
        echo "Expected file with release notes NOT FOUND at: ${NOTES_FILE}"
        exit 1
    fi
    echo "Will use custom release notes:"
    if command -v glow > /dev/null; then
        glow "${NOTES_FILE}"
    else
        cat "${NOTES_FILE}"
    fi
    echo
    PARAM_NOTES="-F ${NOTES_FILE}"
fi

PRE_COMMAND=""
if [ "${DRY_RUN}" -eq 1 ]; then
    echo "Dry run enabled, not doing anything, would have run following command:"
    PRE_COMMAND="echo"
fi

# We need to split below (as -F param is passed, hence below missing double quote lint for below command)
# shellcheck disable=SC2086
# Right now we are not publishing any custom artifacts, source code package is automatically published by GitHub
${PRE_COMMAND} gh release create "${VERSION}" ${PARAM_PRE} --fail-on-no-commits ${PARAM_NOTES} --title "${VERSION}"

if [ "${DRY_RUN}" -eq 1 ]; then
    exit 1
fi