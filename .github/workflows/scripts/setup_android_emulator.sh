#!/usr/bin/env bash
set -o xtrace

export ANDROID_HOME="${PWD}/android-sdk"
export ANDROID_SDK_HOME="${ANDROID_HOME}"
export ANDROID_SDK_ROOT="${ANDROID_HOME}"
export ANDROID_AVD_HOME="${ANDROID_HOME}/.android/avd"
export AVD="${ANDROID_HOME}/avd"
export PREV=${PWD}
export QEMU_AUDIO_DRV=none

mkdir -p "${AVD}" || true

echo "Creating emulator"
(sleep 3 && echo "no") | "${PREV}/android-sdk/cmdline-tools/bin/avdmanager" create avd --force --name "${EMULATOR}" --abi x86_64 --package "${EMULATOR_IMAGE}" --device "pixel_8"

ls "${HOME}/.android"
sed -i 's/android-sdk\///' "${PREV}/android-sdk/.android/avd/${EMULATOR}.avd/config.ini"
sed -i 's/disk.dataPartition.size=.*/disk.dataPartition.size=2500M/' "${PREV}/android-sdk/.android/avd/${EMULATOR}.avd/config.ini"
sed -i 's/disk.cachePartition.size=.*/disk.cachePartition.size=128M/' "${PREV}/android-sdk/.android/avd/${EMULATOR}.avd/config.ini"
cat "${PREV}/android-sdk/.android/avd/${EMULATOR}.avd/config.ini"
ln -s "${PREV}/android-sdk/.android/avd" "${ANDROID_SDK_HOME}/avd"

echo "Listing emulators via avdmanager"
"${PREV}/android-sdk/cmdline-tools/bin/avdmanager" list avd

echo "Listing emulators via emulator command"
"${PREV}/android-sdk/emulator/emulator" -list-avds

echo "Staring adb"
"${PREV}/android-sdk/platform-tools/adb" devices || true

echo "Starting emulator in bg"
nohup "${PREV}/android-sdk/emulator/emulator" -no-snapshot-load -no-metrics -avd "${EMULATOR}" -no-window & $! > emulator.pid

echo "Emulator PID:"
cat emulator.pid

echo "Waiting for emulator"
while [ -z "$("${PREV}/android-sdk/platform-tools/adb" devices | grep emulator.*device)" ]; do "${PREV}/android-sdk/platform-tools/adb" devices; sleep 3; done

echo "Device seems to be ready"
"${PREV}/android-sdk/platform-tools/adb" devices

echo "Setting emulator options"
"${PREV}/android-sdk/platform-tools/adb" shell "settings put global window_animation_scale 0.0"
"${PREV}/android-sdk/platform-tools/adb" shell "settings put global transition_animation_scale 0.0"
"${PREV}/android-sdk/platform-tools/adb" shell "settings put global animator_duration_scale 0.0"
"${PREV}/android-sdk/platform-tools/adb" shell "settings put secure spell_checker_enabled 0"
"${PREV}/android-sdk/platform-tools/adb" shell "settings put secure show_ime_with_hard_keyboard 0"

echo "Saving state"
"${PREV}/android-sdk/platform-tools/adb" emu avd snapshot save fresh

sleep 1


