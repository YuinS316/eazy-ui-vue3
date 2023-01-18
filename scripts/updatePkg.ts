import { runTask, buildComponents, installComponents } from "./build.js";

async function main() {
  await runTask("build components", buildComponents);
}

main();
