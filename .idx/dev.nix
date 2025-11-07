{ pkgs, ... }: {
  # The channel determines which package versions are available.
  channel = "stable-24.05"; # or "unstable"

  # A list of packages to install from the specified channel.
  packages = [
    pkgs.python311 # Use a specific, unambiguous Python version
    pkgs.android-studio
    pkgs.jdk17 # Use a specific, unambiguous JDK version
    pkgs.gradle
    pkgs.nodejs_20
    pkgs.tree-sitter # Keep this for the CLI tool
    pkgs.ruby
    pkgs.bundler
    pkgs.docker_20_10 # Use a specific, unambiguous Docker version
    pkgs.stdenv.cc.cc.lib # Provides the standard C++ library (libstdc++)
  ];

  # Enable the Docker daemon service.
  services.docker.enable = true;

  # Add the default user to the 'docker' group to grant permissions.
  users.users.user.extraGroups = [ "docker" ];

  # A set of environment variables to define within the workspace.
  env = {
    JAVA_HOME = "${pkgs.jdk17}"; # Match the specific JDK version
    ANDROID_HOME = "${pkgs.android-studio}/share/android-sdk";
  };

  # A list of VS Code extensions to install from the Open VSX Registry.
  idx = {
    extensions = [
      "vscodevim.vim",
      "ms-python.python",
      "dbaeumer.vscode-eslint",
      "vscjava.vscode-java-pack",
      "naco-siren.gradle-language",
      "ms-azuretools.vscode-docker" # Provides a visual UI for Docker
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
