#!/usr/bin/env bash

set -e

if [[ ! "${PWD}" == *"files/responses"* ]]; then
    echo "Please run this script from files/responses subdir of repository"
    exit 1
fi

rm -Rf cdn/*

declare -a RELEASES=("8.24.1" "8.24.2")

declare -a RELEASE_URLS=(
    "https://release.constellation.pega.io/8.24.1/react/prod"
    "https://release.constellation.pega.io/8.24.2/react/prod"
)
declare -a CDN_URLS=( 
    "https://release.constellation.pega.io/8.24.2-422/react/prod"
    "https://prod-cdn.constellation.pega.io/8.24.52-349/react/prod"
)

for i in "${!RELEASES[@]}"
do

    RELEASE="${RELEASES[i]}"
    BOOTSTRAP_URL="${RELEASE_URLS[i]}/bootstrap-shell.js"
    LIB_ASSET_URL="${CDN_URLS[i]}/lib_asset.json"
    OUTPUT_DIR="cdn/${RELEASE}"

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
    CONSTELLATION_CORE=$(jq -r '.prerequisite[0] | to_entries[] | .key' < "${OUTPUT_DIR}/lib_asset.json")
    echo "Got constellation core file name from lib_asset.json: ${CONSTELLATION_CORE}"
    CONSTELLATION_CORE_URL="${CDN_URLS[i]}/prerequisite/${CONSTELLATION_CORE}"
    echo "Downloading ${CONSTELLATION_CORE_URL}"
    curl --compressed "${CONSTELLATION_CORE_URL}" -o "${OUTPUT_DIR}/constellation-core.js"
    echo "First 256 chars from downloaded file (for verification)"
    head -c 256 "${OUTPUT_DIR}/bootstrap-shell.js"

    # Replace pxBootstrapConfig name in downloaded files, so it will be distinguishable between versions
    sed -i.bak -e "s/D_pxBootstrapConfig/D_pxBootstrapConfig-${RELEASE}/g" "${OUTPUT_DIR}"/*
    rm "${OUTPUT_DIR}"/*.bak

done

# Required for 8.24.2
curl "https://prod-cdn.constellation.pega.io/8.24.52-349/react/prod/prerequisite/js/99.4989502c.js" -o "cdn/8.24.2/99.4989502c.js"