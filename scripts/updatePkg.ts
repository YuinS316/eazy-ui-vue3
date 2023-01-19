import { runTask, buildComponents, buildUtils } from "./build.js";

async function main() {
  await runTask("build utils", buildUtils);
  await runTask("build components", buildComponents);
}

main();
