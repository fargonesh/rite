{ pkgs, lib, config, inputs, ... }:

{

  packages = [ pkgs.git ];

  languages.javascript.enable = true;
  languages.javascript.npm.enable = true;

  scripts.build.exec = "npm run build";
  scripts.pack.exec = "npm pack --dry-run";
  scripts.publish.exec = "npm publish";

}
