#!/bin/bash

# A script to build the Codemap Android App inside a Termux environment.
# This script automates the download and configuration of the Android SDK.

echo "### Termux Android Build Script ###"
echo ""

# --- Prerequisite Check ---
echo "--> Checking for required tools (git, openjdk-17, gradle, wget, unzip)..."
for tool in git openjdk-17 gradle wget unzip; do
    if ! command -v $tool &> /dev/null; then
        echo "!!! ERROR: '''$tool''' is not installed."
        echo "Please run '''pkg install $tool''' and try again."
        exit 1
    fi
done
echo "--> All tools found."
echo ""


# --- Java Setup ---
echo "--> Configuring JAVA_HOME..."
# Termux installs OpenJDK 17 in a standard location.
export JAVA_HOME=/data/data/com.termux/files/usr/lib/jvm/java-17-openjdk
echo "    JAVA_HOME set to $JAVA_HOME"
echo ""


# --- Android SDK Setup ---
SDK_ROOT=$HOME/android-sdk
CMDLINE_TOOLS_ZIP="commandlinetools-linux-11076708_latest.zip"

if [ ! -d "$SDK_ROOT/cmdline-tools" ]; then
    echo "--> Setting up Android SDK in '$SDK_ROOT'..."
    mkdir -p $SDK_ROOT
    cd $SDK_ROOT

    echo "--> Downloading Android command-line tools..."
    wget https://dl.google.com/android/repository/$CMDLINE_TOOLS_ZIP

    echo "--> Extracting tools..."
    unzip $CMDLINE_TOOLS_ZIP
    rm $CMDLINE_TOOLS_ZIP

    # The tools are unzipped to `cmdline-tools`. We need to move them into a `latest` subdirectory
    # for the sdkmanager to work correctly.
    mkdir -p cmdline-tools/latest
    mv bin lib NOTICE.txt source.properties cmdline-tools/latest/
    
    echo "--> Android SDK command-line tools installed."
    echo "--> Now, installing platform tools and build tools. This may take a while."
    
    # The SDK manager requires us to accept licenses before downloading.
    yes | $SDK_ROOT/cmdline-tools/latest/bin/sdkmanager --licenses > /dev/null
    
    # Install the specific platform-tools, platforms, and build-tools required by the project.
    $SDK_ROOT/cmdline-tools/latest/bin/sdkmanager "platform-tools" "platforms;android-34" "build-tools;34.0.0"
    
    echo "--> SDK setup complete."
    cd $HOME/Codemap-DNA-Tesseract # Navigate back to project root
else
    echo "--> Android SDK already found in '$SDK_ROOT'. Skipping setup."
fi
echo ""

# --- Environment Variable Export ---
export ANDROID_HOME=$SDK_ROOT
export PATH=$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/cmdline-tools/latest/bin


# --- Gradle Build ---
echo "### Building the Android App Bundle (.aab) ###"
echo "This will download dependencies and compile the app. This is the longest step."

cd CodemapAndroidHost
./gradlew app:bundleRelease

# Check if the build command was successful
if [ $? -ne 0 ]; then
    echo ""
    echo "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
    echo "!!! Gradle build failed."
    echo "!!! Please review the error messages above to diagnose the issue."
    echo "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
    exit 1
fi
echo ""
echo "--> Gradle build successful!"
echo "--> App Bundle created at: CodemapAndroidHost/app/build/outputs/bundle/release/app-release.aab"
echo ""


# --- Bundletool APK Generation ---
BUNDLETOOL_JAR="$HOME/bundletool.jar"
if [ ! -f "$BUNDLETOOL_JAR" ]; then
    echo "### Downloading bundletool ###"
    # Using a known-good version of bundletool
    wget https://github.com/google/bundletool/releases/download/1.15.6/bundletool-all-1.15.6.jar -O $BUNDLETOOL_JAR
fi

echo "### Generating Universal APK file (.apks) from the App Bundle ###"
java -jar $BUNDLETOOL_JAR build-apks --bundle=./app/build/outputs/bundle/release/app-release.aab --output=codemap.apks --mode=universal --overwrite
echo "--> Universal APK set created at: CodemapAndroidHost/codemap.apks"
echo ""


# --- Installation Instructions ---
echo "*****************************************************************"
echo "***                  BUILD COMPLETE & READY TO INSTALL                  ***"
echo "*****************************************************************"
echo ""
echo "To install the app on your phone, run the following command:"
echo ""
echo "java -jar $BUNDLETOOL_JAR install-apks --apks=CodemapAndroidHost/codemap.apks"
echo ""
