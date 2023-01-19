import {
  runTask,
  buildComponents,
  installComponents,
  buildUtils,
} from "./build.js";

async function boostrap() {
  await runTask("build utils", buildUtils);
  await runTask("build components", buildComponents);

  await Promise.all([runTask("install components", installComponents)]);
}

boostrap();
