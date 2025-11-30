{ pkgs, ... }:
let
  android-sdk-env = pkgs.androidenv.composeAndroidPackages {
    buildToolsVersions = ["35.0.0"];
    platformVersions = ["34"];
    platformTools = true;
    cmdlineTools = true;
    acceptAndroidSdkLicenses = true;
  };
in
{
  channel = "stable-24.05";
  packages = [
    pkgs.git
    pkgs.gdb
    pkgs.wget
    pkgs.zip
    pkgs.unzip
    pkgs.rsync
    pkgs.jest
    pkgs.nodejs_20
    pkgs.go
    pkgs.flutter
    pkgs.jdk17
    pkgs.gradle
    android-sdk-env
  ];
  env = {
    JAVA_HOME = "${pkgs.jdk17}";
    ANDROID_HOME = "${android-sdk-env}";
    GCLOUD_PROJECT = "codemap-dna-tesseract";
    FIREBASE_AUTH_EMULATOR_HOST = "127.0.0.1:9099";
    FIREBASE_FIRESTORE_EMULATOR_HOST = "127.0.0.1:8080";
  };
  idx.extensions = [
    "vscodevim.vim"
    "github.copilot"
    "eamodio.gitlens"
    "dart-code.flutter"
    "vscjava.vscode-java-pack"
    "redhat.java"
    "fwcd.kotlin"
    "sumneko.lua"
    "firebase.firebase-vscode"
  ];
  idx.workspace = {
    onCreate = {
      npm-install = "npm install";
      go-mod = "go mod tidy";
    };
    onStart = {
      start-server = "npm run dev";
    };
  };
  idx.previews = {
    enable = true;
    previews = {
      web = {
        command = ["npm" "run" "dev" "--" "--port" "$PORT"];
        manager = "web";
      };
    };
  };
}
