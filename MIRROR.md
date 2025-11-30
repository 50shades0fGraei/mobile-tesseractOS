# Mirror Build Environment Documentation

This document outlines the setup and purpose of the Docker-based mirror environment. The goal is to create a fully independent, reproducible build environment that can be run in parallel to the primary Nix-based IDE. This allows us to validate the portability of our build process and gather comparative data on efficiency.

## 1. Purpose

The mirror environment, defined in the `Dockerfile`, serves several key purposes:

- **Reproducibility:** Guarantees a consistent build environment on any machine with Docker installed, eliminating the "it works on my machine" problem.
- **CI/CD Integration:** Provides a straightforward way to build, test, and deploy the application within a continuous integration pipeline.
- **Performance Benchmarking:** Allows for a direct comparison of build times and resource utilization against the primary Nix IDE environment. This helps us quantify the efficiency gains of the Tesseract architecture and our development setup.

## 2. Building the Docker Image

To create the Docker image, navigate to the root of the project and run the following command. This will execute the steps in the `Dockerfile`, installing all Nix dependencies and copying the source code into the image.

```bash
docker build -t tesseract-build .
```

## 3. Running the Build

Once the image is built, you can run the release build with the following command. This will start a container from the `tesseract-build` image and execute the build command we defined.

```bash
docker run --rm tesseract-build
```

Upon completion, the final Android App Bundle (`.aab`) will be inside the container. In our next iteration, we can add steps to automatically copy the build artifacts out of the container.

## 4. Environment Comparison

This table, inspired by the project manifesto, will be used to document our findings. We will measure and compare the two environments across several key metrics.

| Metric                 | Nix IDE Environment (Primary) | Docker Mirror Environment (Secondary) | Analysis & Observations |
| ---------------------- | ----------------------------- | ------------------------------------- | ----------------------- |
| **Initial Setup Time** | | | *e.g., Time to install Nix vs. Docker.* |
| **Build Time**         | | | *e.g., Run the build command in both and record wall-clock time.* |
| **CPU / Memory Usage** | | | *e.g., Use `top` or `htop` during builds to get a rough idea.* |
| **Portability**        | | | *e.g., Ease of setting up on a new machine.* |
| **Reproducibility**    | | | *e.g., Consistency of builds between different runs.* |

By documenting these metrics, we can create a data-driven feedback loop to continuously improve our development and build processes, fully in the spirit of the Tesseract architecture.
