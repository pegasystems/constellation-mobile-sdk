#!/usr/bin/env bash

set -e

if [[ ! "${PWD}" == *"files/responses"* ]]; then
    echo "Please run this script from files/responses subdir of repository"
    exit 1
fi

rm -Rf cdn/*

declare -a RELEASES=("8.24.1" "8.24.2" "25.1")

declare -a CDN_URLS=( 
    "https://release.constellation.pega.io/8.24.2-422/react/prod" #24.1
    "https://prod-cdn.constellation.pega.io/8.24.52-349/react/prod" #24.2
    "https://prod-cdn.constellation.pega.io/25.1.1-199/react/prod" #25.1
)

for i in "${!RELEASES[@]}"
do

    BOOTSTRAP_URL="${CDN_URLS[i]}/bootstrap-shell.js"
    LIB_ASSET_URL="${CDN_URLS[i]}/lib_asset.json"
    OUTPUT_DIR="cdn/${RELEASES[i]}"

    mkdir "$OUTPUT_DIR"

    echo "This script will download latest JS requirements for tests with mocked responses"
    echo "Note that, downloaded files are *NOT* licensed under Apache 2"
    echo

    echo "====== Downloading ${BOOTSTRAP_URL} ======"
    curl --compressed "${BOOTSTRAP_URL}" -o "${OUTPUT_DIR}/bootstrap-shell.js"
    echo "First 256 chars from downloaded file (for verification)"
    head -c 256 "${OUTPUT_DIR}/bootstrap-shell.js"
    echo

    echo "====== Downloading ${LIB_ASSET_URL} ======"
    curl --compressed "${LIB_ASSET_URL}" -o "${OUTPUT_DIR}/lib_asset.json"
    echo "First 256 chars from downloaded file (for verification)"
    head -c 256 "${OUTPUT_DIR}/lib_asset.json"
    echo

    echo "====== Downloading constellation core ======"
    C11_CORE_FILENAME=$(grep -o '"constellation-core\.[^"]*\.js"' "${OUTPUT_DIR}/lib_asset.json" | head -1 | tr -d '"')
    if [[ -z "${C11_CORE_FILENAME}" ]]; then
        echo "ERROR: Could not extract constellation-core filename from ${OUTPUT_DIR}/lib_asset.json"
        exit 1
    fi
    CONSTELLATION_CORE_URL="${CDN_URLS[i]}/prerequisite/${C11_CORE_FILENAME}"
    echo "Downloading ${CONSTELLATION_CORE_URL}"
    curl --compressed "${CONSTELLATION_CORE_URL}" -o "${OUTPUT_DIR}/constellation-core.js"
    echo "First 256 chars from downloaded file (for verification)"
    head -c 256 "${OUTPUT_DIR}/constellation-core.js"

done

    echo "====== Downloading 24.2 additional js dependencies ======"
    FILE_48543_URL="${CDN_URLS[1]}/prerequisite/js/48543.bff6d064.js"
    OUTPUT_DIR_24_2="cdn/${RELEASES[1]}"
    echo "Downloading ${FILE_48543_URL}"
    curl --compressed "${FILE_48543_URL}" -o "${OUTPUT_DIR_24_2}/48543.js"
    echo "First 256 chars from downloaded file (for verification)"
    head -c 256 "${OUTPUT_DIR_24_2}/48543.js"

    echo "====== Downloading 25.1 additional js dependencies ======"
    LIB_PHONE_NUMBER_URL="${CDN_URLS[2]}/prerequisite/js/libphonenumber.10e61843.js"
    OUTPUT_DIR_25_1="cdn/${RELEASES[2]}"
    echo "Downloading ${LIB_PHONE_NUMBER_URL}"
    curl --compressed "${LIB_PHONE_NUMBER_URL}" -o "${OUTPUT_DIR_25_1}/libphonenumber.js"
    echo "First 256 chars from downloaded file (for verification)"
    head -c 256 "${OUTPUT_DIR_25_1}/libphonenumber.js"
