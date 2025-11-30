#!/bin/sh
export JAVA_HOME=/nix/store/8yqdr7xk055fgqjzhcjdspnf24w70qwp-zulu-ca-jdk-17.0.8.1
export PATH=$JAVA_HOME/bin:$PATH
export ANDROID_HOME=/nix/store/wkwivrh1jb9915byplgvj2f3ziiwb6cf-androidsdk/libexec/android-sdk
cd CodemapAndroidHost && ./gradlew bundleRelease --no-daemon
