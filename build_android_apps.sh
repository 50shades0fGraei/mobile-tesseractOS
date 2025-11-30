#!/bin/bash

# This script automates the build process for the two Android apps in this project.

# Exit immediately if a command exits with a non-zero status.
set -e

# Set the JAVA_HOME and PATH environment variables explicitly.
# This ensures that the correct JDK is used for the build, even if the shell environment is not properly configured.
export JAVA_HOME=$(nix-build --no-out-link '<nixpkgs>' -A jdk17)
export PATH=$JAVA_HOME/bin:$PATH

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
    # _build_tesseract_remote
    echo "All Android apps built successfully."
}

main
