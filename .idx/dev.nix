{ pkgs, ... }: {
  # The channel determines which package versions are available.
  channel = "stable-24.05"; # or "unstable"

  # A list of packages to install from the specified channel.
  packages = [
    pkgs.python3
    # Added pip to the environment
    pkgs.pip
    pkgs.android-studio
    pkgs.jdk
    pkgs.gradle
    pkgs.nodejs_20
    # Added tree-sitter for universal code parsing
    pkgs.tree-sitter
    pkgs.typescript
    pkgs.ts-node
  ];

  # A set of environment variables to define within the workspace.
  env = {
    API_KEY = "your-secret-key";
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
        npm-install = "npm install";
        # Install tree-sitter libraries for Python
        pip-install-treesitter = "pip install tree-sitter tree-sitter-languages";
      };
      # Runs every time the workspace is (re)started).
      onStart = {
        start-server = "echo 'Android dev environment ready'";
      };
    };
  };
}
