{ pkgs, ... }: {
  # The channel determines which package versions are available.
  channel = "stable-24.05"; # or "unstable"

  # A list of packages to install from the specified channel.
  packages = [
    pkgs.python3
    pkgs.android-studio
    pkgs.jdk
    pkgs.gradle
    pkgs.nodejs_20
    # Added tree-sitter for universal code parsing
    pkgs.tree-sitter
    pkgs.typescript
    pkgs.nodePackages.ts-node
    # Added unzip for gradle
    pkgs.unzip
    # The Jin summoner command
    (pkgs.callPackage ./.idx/jin.nix { })
  ];

  # A set of environment variables to define within the workspace.
  env = {
    API_KEY = "your-secret-key";
    # Set JAVA_HOME for Android builds
    JAVA_HOME = "${pkgs.jdk}";
    # Set ANDROID_HOME for Android builds
    ANDROID_HOME = "${pkgs.android-studio}/share/android-sdk";
    NIXPKGS_ALLOW_UNFREE = 1;
  };

  # A list of VS Code extensions to install from the Open VSX Registry.
  idx = {
    extensions = [
      "vscodevim.vim",
      "ms-python.python",
      "dbaeumer.vscode-eslint",
      "vscjava.vscode-java-pack",
      "naco-siren.gradle-language"
    ];

    # Workspace lifecycle hooks.
    workspace = {
      # Runs when a workspace is first created.
      onCreate = {
        npm-install = "npm install";
        # Install tree-sitter libraries for Python
        pip-install-treesitter = "pip install tree-sitter tree-sitter-languages";
        # Install all other python dependencies for the project
        pip-install-reqs = "pip install -r requirements.txt";
      };
      # Runs every time the workspace is (re)started.
      onStart = {
        check-java-home = "echo JAVA_HOME onStart: $JAVA_HOME";
      };
    };

    # Configure a web preview for the API bridge.
    previews = {
      enable = true;
      previews = {
        api = {
          command = ["python" "api_bridge.py"];
          manager = "web";
        };
      };
    };
  };
}
