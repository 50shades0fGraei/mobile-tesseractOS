
{ pkgs, ... }:

let
  # Define a custom Android SDK with specific versions for reproducibility,
  # as found in the gemini-build.nix file.
  android-sdk = pkgs.androidenv.composeAndroidPackages {};
in
{
  # The Nixpkgs channel to use for packages.
  channel = "stable-24.05"; # Using a stable channel ensures reproducibility.

  # A list of packages to make available in the development environment.
  packages = [
    pkgs.python3
    pkgs.nodejs_20
    pkgs.go
    pkgs.gdb
    pkgs.wget
    pkgs.zip
    pkgs.unzip
    pkgs.rsync

    # --- Android & Java Build Environment ---
    pkgs.jdk17
    pkgs.gradle # Gradle is necessary for building Android projects.
    android-sdk  # Use the custom Android SDK defined above.
    pkgs.termux-api
  ];

  # A map of environment variables to set within the workspace.
  env = {
    # --- Java and Android ---
    JAVA_HOME = "${pkgs.jdk17}";

    # Set ANDROID_HOME to the correct path within the custom SDK derivation.
    ANDROID_HOME = "${android-sdk}/libexec/android-sdk";

    # --- Firebase Emulator Suite ---
    GCLOUD_PROJECT = "codemap-dna-tesseract";
    FIREBASE_AUTH_EMULATOR_HOST = "127.0.0.1:9099";
    FIREBASE_FIRESTORE_EMULATOR_HOST = "127.0.0.1:8080";
  };

  # A list of VS Code extensions to install from the Open VSX Registry.
  idx.extensions = [
    "jnoortheen.nix-ide"
    "github.copilot"
    "github.copilot-chat"
    "svelte.svelte-vscode"
    "dbaeumer.vscode-eslint"
    "esbenp.prettier-vscode"
    "ms-python.python"
    "ms-python.debugpy"
    "golang.go"
    "vscjava.vscode-java-pack"
  ];

  # Workspace lifecycle hooks to automate setup tasks.
  idx.workspace = {
    # These commands run only when the workspace is first created.
    onCreate = {
      install-npm-deps = "npm install";
      install-python-deps = "pip install --upgrade pip && pip install -r requirements.txt";
    };
    # These commands run every time the workspace is (re)started.
    onStart = {
       # This command helps diagnose if the environment is reloading correctly.
      check-java-home = "echo '--- Gemini Diagnostic Check ---' && echo 'JAVA_HOME is set to: $JAVA_HOME' && echo '---------------------------'";
    };
  };

  # Web previews for running applications.
  idx.previews = {
    enable = true;
    previews = {
      tesseract-os = {
        command = ["sh" "-c" "cd src/codemap_dna_tesseract && python3 tesseract_os.py"];
        manager = "web";
      };
    };
  };
}
