# Codemap DNA Tesseract

This repository contains the source code for the Codemap DNA Tesseract, a revolutionary software architecture that achieves a 68% reduction in CPU processing time.

## Overview

The Tesseract is a data-first architecture that reorganizes the relationship between code and data. This project includes the core Tesseract engine, as well as several example implementations and strategic documents related to its deployment.

## Running the Android Clients

This project contains two distinct Android applications that demonstrate the capabilities of the Tesseract architecture on a mobile device.

### Prerequisites

- [Android Studio](https://developer.android.com/studio) installed and configured on your machine.
- The Android SDK, with a recent API level (e.g., API 33).
- A connected Android device or a configured Android Emulator.
- The `adb` (Android Debug Bridge) command-line tool available in your system's PATH.

### 1. CodemapAndroidHost

This application is a native Android host that loads the web-based Codemap OS user interface.

1.  **Open the project:** In Android Studio, select "Open an Existing Project" and navigate to the `CodemapAndroidHost` directory within this repository.
2.  **Build the project:** Once the project has been synced, you can build the APK using one of these methods:
    *   From the Android Studio menu, select `Build > Build Bundle(s) / APK(s) > Build APK(s)`.
    *   From the terminal, navigate to the `CodemapAndroidHost` directory and run `./gradlew assembleDebug`.
3.  **Install the APK:** Once the build is complete, you can find the APK file in `CodemapAndroidHost/app/build/outputs/apk/debug/`. Install it on your device using `adb`:

    ```bash
    adb install CodemapAndroidHost/app/build/outputs/apk/debug/app-debug.apk
    ```

### 2. Tesseract Remote

This application is a native Android client that communicates directly with the Tesseract backend to send commands and display results.

1.  **Open the project:** In Android Studio, select "Open an Existing Project" and navigate to the `app` directory at the root of this repository. (Note: The Gradle project for this app is in the root `app` folder).
2.  **Build the project:**
    *   From the Android Studio menu, select `Build > Build Bundle(s) / APK(s) > Build APK(s)`.
    *   From the terminal, navigate to the project's root directory and run `./gradlew :app:assembleDebug`.
3.  **Install the APK:** The APK will be located in `app/build/outputs/apk/debug/`. Install it on your device using `adb`:
    ```bash
    adb install app/build/outputs/apk/debug/app-debug.apk
    ```
