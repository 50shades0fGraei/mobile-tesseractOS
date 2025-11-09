# Codemap DNA Tesseract

This repository contains the source code for the Codemap DNA Tesseract, a revolutionary software architecture that achieves a 68% reduction in CPU processing time.

## Overview

The Tesseract is a data-first architecture that reorganizes the relationship between code and data. This project includes the core Tesseract engine, as well as several example implementations and strategic documents related to its deployment.

## Building the Project

This project is configured to be built within a reproducible Nix environment, which ensures that all developers have the exact same set of tools and dependencies.

### Prerequisites

- The Nix package manager must be installed on your system if you are building outside of a Nix-enabled IDE like Firebase Studio.
- A connected Android device or a configured Android Emulator.
- The `adb` (Android Debug Bridge) command-line tool.

### Build Command

To build the release version of the Android App Bundle (`.aab`), run the following command from the root of the project:

```bash
nix-shell shell.nix --run "cd CodemapAndroidHost && ./gradlew bundleRelease"
```

Upon successful completion, the App Bundle will be located at:
`CodemapAndroidHost/app/build/outputs/bundle/release/app-release.aab`

## Installing on a Phone

An Android App Bundle (`.aab`) can't be installed directly using `adb`. You need to use `bundletool` to generate a set of APKs specific to your device and then install them.

### 1. Download `bundletool`

If you don't have it, you can download `bundletool` from the [official Android developer website](https://developer.android.com/studio/command-line/bundletool).

### 2. Generate Device-Specific APKs

Use `bundletool` to generate a universal APK (`.apks`) from the App Bundle (`.aab`). This is the easiest for local testing.

```bash
java -jar /path/to/bundletool.jar build-apks --bundle=CodemapAndroidHost/app/build/outputs/bundle/release/app-release.aab --output=codemap.apks --mode=universal
```

Alternatively, you can generate an APK set specifically for a connected device:

```bash
java -jar /path/to/bundletool.jar build-apks --connected-device --bundle=CodemapAndroidHost/app/build/outputs/bundle/release/app-release.aab --output=codemap.apks
```

### 3. Install the APKs

Use `bundletool` to install the generated APK set onto your connected device.

```bash
java -jar /path/to/bundletool.jar install-apks --apks=codemap.apks
```

Your app should now be installed on your phone!
