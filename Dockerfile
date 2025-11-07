# Dockerfile for creating a reproducible build environment for the Codemap DNA Tesseract.
# This serves as a mirror to the Nix-based IDE environment for comparison and CI/CD.

# Use the official Nix image, which has Nix pre-installed and configured.
FROM nixos/nix:latest

# Set the working directory inside the container.
WORKDIR /app

# Copy the Nix configuration files first to leverage Docker layer caching.
# If these files don't change, we don't need to re-install dependencies.
COPY ./.idx/dev.nix ./.idx/dev.nix
COPY ./shell.nix ./shell.nix

# Copy the rest of the project source code.
COPY . .

# The main command to run the build.
# This uses nix-shell to create the environment and execute the build command.
# The `nix-shell` command will automatically read the `shell.nix` file,
# install all the dependencies specified in `.idx/dev.nix`, and then
# execute the command provided in `--run`.
CMD ["nix-shell", "shell.nix", "--run", "cd CodemapAndroidHost && ./gradlew bundleRelease"]
