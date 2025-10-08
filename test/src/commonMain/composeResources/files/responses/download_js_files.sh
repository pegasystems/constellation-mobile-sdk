#!/usr/bin/env bash

if [[ ! "${PWD}" == *"files/responses"* ]]; then
    echo "Please run this script from files/responses subdir of repository"
    exit 1
fi

CDN_PREFIX="https://staging-cdn.constellation.pega.io/8.24.2-422"
RELEASE_PREFIX="https://release.constellation.pega.io/8.24.1"

BOOTSTRAP_URL="${RELEASE_PREFIX}/react/prod/bootstrap-shell.js"
LIB_ASSET_URL="${CDN_PREFIX}/react/prod/lib_asset.json"

echo "This script will download latest JS requirements for tests with mocked responses"
echo "Note that, downloaded files are *NOT* licensed under Apache 2"
echo

echo "====== Downloading ${BOOTSTRAP_URL} ======"
curl --compressed "${BOOTSTRAP_URL}" -o "cdn/bootstrap-shell.js"
echo "First 256 chars from downloaded file (for verification)"
head -c 256 "cdn/bootstrap-shell.js"
echo

echo "====== Downloading ${LIB_ASSET_URL} ======"
curl --compressed "${LIB_ASSET_URL}" -o "cdn/lib_asset.json"
echo "First 256 chars from downloaded file (for verification)"
head -c 256 "cdn/lib_asset.json"
echo

echo "====== Downloading constellation core ======"
CONSTELLATION_CORE=$(jq -r '.prerequisite[0] | to_entries[] | .key' < cdn/lib_asset.json)
echo "Got constellation core file name from lib_asset.json: ${CONSTELLATION_CORE}"
CONSTELLATION_CORE_URL="${CDN_PREFIX}/react/prod/prerequisite/${CONSTELLATION_CORE}"
echo "Downloading ${CONSTELLATION_CORE_URL}"
curl --compressed "${CONSTELLATION_CORE_URL}" -o "cdn/constellation-core.js"
echo "First 256 chars from downloaded file (for verification)"
head -c 256 "cdn/bootstrap-shell.js"

