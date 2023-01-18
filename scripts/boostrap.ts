import { runTask, buildComponents, installComponents } from "./build.js";

async function boostrap() {
  await runTask("build components", buildComponents);

  await Promise.all([runTask("install components", installComponents)]);
}

boostrap();
