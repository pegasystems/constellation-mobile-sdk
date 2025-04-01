#!/bin/sh

set -e

# Clean previous build
rm -rf ./build || true

# Variables
WORKSPACE="SDK.xcworkspace"
SCHEME="ConstellationSDK"
FRAMEWORK_NAME="ConstellationSDK"

# Build and archive for iOS devices (arm64)
xcodebuild archive \
  -workspace "$WORKSPACE" \
  -scheme "$SCHEME" \
  -destination "generic/platform=iOS" \
  -archivePath ./build/ios_devices.xcarchive \
  -sdk iphoneos \
  SKIP_INSTALL=NO \
  BUILD_LIBRARY_FOR_DISTRIBUTION=YES

# Check if the device archive was successful
if [ $? -ne 0 ]; then
  echo "Device archive failed!"
  exit 1
fi

# Build and archive for iOS simulators (x86_64 and arm64)
xcodebuild archive \
  -workspace "$WORKSPACE" \
  -scheme "$SCHEME" \
  -destination "generic/platform=iOS Simulator" \
  -archivePath ./build/ios_simulators.xcarchive \
  -sdk iphonesimulator \
  SKIP_INSTALL=NO \
  BUILD_LIBRARY_FOR_DISTRIBUTION=YES

# Check if the simulator archive was successful
if [ $? -ne 0 ]; then
  echo "Simulator archive failed!"
  exit 1
fi

# Create XCFramework
xcodebuild -create-xcframework \
  -framework ./build/ios_devices.xcarchive/Products/Library/Frameworks/"$FRAMEWORK_NAME".framework \
  -framework ./build/ios_simulators.xcarchive/Products/Library/Frameworks/"$FRAMEWORK_NAME".framework \
  -output ./build/"$FRAMEWORK_NAME".xcframework

# Check if XCFramework creation was successful
if [ $? -eq 0 ]; then
  echo "XCFramework has been created at ./build/$FRAMEWORK_NAME.xcframework"
else
  echo "XCFramework creation failed!"
  exit 1
fi
