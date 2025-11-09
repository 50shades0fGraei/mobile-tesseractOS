
let pkgs = import <nixpkgs> {}; in pkgs.androidenv.composeAndroidPackages {
  buildToolsVersions = ["35.0.0"];
  platformVersions = ["34"];
  platformTools = true;
  cmdlineTools = true;
  acceptAndroidSdkLicenses = true;
}
