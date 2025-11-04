# .idx/jin.nix

# This file defines a custom Nix package for the Jin command.
# It wraps the jin.py script in a way that makes it executable
# from anywhere in the terminal.

{ pkgs, ... }:

# We use `buildPythonApplication` to package our Python script.
# It creates a wrapper that makes the script executable.
pkgs.python3Packages.buildPythonApplication {
  # The name of our package
  pname = "jin";
  # The version of our package
  version = "1.0.0";

  # The source code for our package
  src = ./.; # Use the current directory as the source

  # The dependencies required by our script
  propagatedBuildInputs = [
    pkgs.python3Packages.requests
    pkgs.python3Packages.tree-sitter
    pkgs.python3Packages.tree-sitter-languages
  ];

  # Since this is a simple script and not a full package,
  # we tell Nix not to look for a setup.py file.
  dontBuild = true;
  dontInstall = true;
  installPhase = ''
    mkdir -p $out/bin
    cp Codemap-DNA-tesseract/jin.py $out/bin/jin
    chmod +x $out/bin/jin
    # The wrapper needs to know how to run the script.
    # We also prepend the python interpreter to the script.
    preFixup = ''
      makeWrapper ${pkgs.python3}/bin/python $out/bin/jin --add-flags "-I"
    '';
  '';

  # A short description of the package.
  meta = {
    description = "The summoner for Tesseract OS";
  };
}
