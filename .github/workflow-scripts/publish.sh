#!/usr/bin/env bash

DRY_RUN=0
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
    -*)
        echo "Unknown option $1"
        exit 1
        ;;
    *)
        POSITIONAL_ARGS+=("$1") # save positional arg
        shift # past argument
        ;;
    esac
done

if [ -z "${MINOR_VERSION}" ] || [ -z "${MAJOR_VERSION}" ]; then
    echo "Provide minor and major version e.g. $0 --major 1 --minor 0"
    exit 1
fi

TIMESTAMP=$(date -u +%Y-%m-%d-%H-%M)
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

if [ "${DRY_RUN}" -eq 1 ]; then
    echo "Dry run enabled, not doing anything, would have run following command:"
    echo "gh release create \"${VERSION}\" \"${PARAM_PRE}\" --generate-notes \"ios-release/*.*\" \"android-release/*.*\""
    exit 1
fi

gh release create "${VERSION}" "${PARAM_PRE}" --generate-notes "ios-release/*.*" "android-release/*.*"
