#!/bin/bash

# This script automates the build process for the two Android apps in this project.

# Exit immediately if a command exits with a non-zero status.
set -e

# Build CodemapAndroidHost
_build_codemap_android_host() {
    echo "Building CodemapAndroidHost..."
    pushd CodemapAndroidHost
    ./gradlew assembleDebug
    popd
    echo "CodemapAndroidHost build complete."
}

# Build Tesseract Remote
_build_tesseract_remote() {
    echo "Building Tesseract Remote..."
    ./gradlew :app:assembleDebug
    echo "Tesseract Remote build complete."
}

# Main function
main() {
    _build_codemap_android_host
    _build_tesseract_remote
    echo "All Android apps built successfully."
}

main
