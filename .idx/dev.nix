{ pkgs, ... }:

{
  # Use the stable-24.05 channel for reproducible builds.
  channel = "stable-24.05";

  # These are the packages required for Android development in Firebase Studio.
  packages = [
    pkgs.jdk17
    pkgs.gradle
    pkgs.android-sdk-cmdline-tools # Provides the core SDK manager
    pkgs.android-platform-tools    # Provides the `adb` tool
  ];

  # Environment variables needed by the Android build tools and the IDE.
  env = {
    ANDROID_HOME = "${pkgs.android-sdk-cmdline-tools}/libexec/android-sdk";
    JAVA_HOME = "${pkgs.jdk17.home}";
  };

  # Configuration for the Firebase Studio IDE.
  idx = {
    # This block enables the Android emulator preview.
    previews = {
      enable = true;
      previews = {
        android = {
          manager = "android";
        };
      };
    };
  };
}
