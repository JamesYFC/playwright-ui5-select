#!/bin/bash

set -e

mkdir -p temp
echo "Creating /temp..."
cd temp

IMPORT_FOLDER="src/playwright_ui5_select/import/ui5/"

# check upstream version
curl -sS https://registry.npmjs.org/playwright-ui5/latest -o ui5.json
NPM_VERSION=$(jq -r .version ui5.json)
echo "upstream: $NPM_VERSION"
cd ..

# check local version
TXT_VERSION=$(cat "$IMPORT_FOLDER.version")
echo "local:    $TXT_VERSION"

# update if version mismatch
if [ "$NPM_VERSION" != "$TXT_VERSION" ]; then
    echo "Updating local version to match upstream..."
    
    echo "Downloading tarball..."
    $(jq -r ".dist.tarball" temp/ui5.json \
    | tr -d '\r' \
    | xargs -I {} curl -sS {} -o temp/ui5.tar.gz)

    # Verify checksum
    EXPECTED_SHASUM=$(jq -r ".dist.shasum" temp/ui5.json)
    ACTUAL_SHASUM=$(sha1sum temp/ui5.tar.gz | cut -d' ' -f1)

    if [ "$EXPECTED_SHASUM" != "$ACTUAL_SHASUM" ]; then
        echo "ERROR: Checksum mismatch! Aborting."
        exit 1
    fi

    echo "Checksum verified."

    echo "Extracting tarball..."
    tar -xzf temp/ui5.tar.gz --strip-components=3 -C $IMPORT_FOLDER package/dist/browser

    echo "Updating version file..."
    echo "$NPM_VERSION" > $IMPORT_FOLDER.version

    echo "Update complete. Local version is now $NPM_VERSION."

    echo "new_version=$NPM_VERSION" >> "$GITHUB_OUTPUT"
else
    echo "Version matches, no update needed."
fi

# cleanup
echo "Deleting /temp..."
rm -rf temp

echo "Done"