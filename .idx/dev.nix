{ pkgs ? import <nixpkgs> {}, ... }: {
  # The channel determines which package versions are available.
  channel = "stable-24.05"; # or "unstable"

  # A list of packages to install from the specified channel.
  packages = [
    pkgs.python3
    pkgs.android-studio
    pkgs.jdk
    pkgs.gradle
    pkgs.nodejs_20
    pkgs.tree-sitter # Keep this for the CLI tool
    pkgs.ruby
    pkgs.bundler
  ];

  # A set of environment variables to define within the workspace.
  env = {
    JAVA_HOME = "${pkgs.jdk}";
    ANDROID_HOME = "${pkgs.android-studio}/share/android-sdk";
  };

  # A list of VS Code extensions to install from the Open VSX Registry.
  idx = {
    extensions = [
      "vscodevim.vim"
      "ms-python.python"
      "dbaeumer.vscode-eslint"
      "vscjava.vscode-java-pack"
      "naco-siren.gradle-language"
    ];

    # Workspace lifecycle hooks.
    workspace = {
      # Runs when a workspace is first created.
      onCreate = {
        # 1. Create a Python virtual environment
        create-venv = "python3 -m venv .venv";
        # 2. Install Python packages into the virtual environment
        pip-install = ".venv/bin/pip install tree-sitter tree-sitter-languages";
        npm-install = "npm install";
      };
      # Runs every time the workspace is (re)started.
      onStart = {
        start-server = "echo 'Android dev environment ready'";
      };
    };
  };
}
