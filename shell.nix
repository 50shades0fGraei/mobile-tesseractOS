
{ pkgs ? import <nixpkgs> {} }:
let
  # Import the configuration from your .idx/dev.nix file.
  idxConfig = import ./.idx/dev.nix { inherit pkgs; };
in
# Create a shell environment using mkShell.
pkgs.mkShell {
  # Use the packages defined in your configuration.
  buildInputs = idxConfig.packages;

  # Set the environment variables from your configuration.
  JAVA_HOME = "${pkgs.jdk}";
  ANDROID_HOME = "${pkgs.android-studio}/share/android-sdk";
}
