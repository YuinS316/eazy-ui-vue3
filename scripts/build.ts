import ora from "ora";
import { execa } from "execa";
import { resolve } from "path";

const CWD = process.cwd();

const PKG_EMAMPLES = resolve(CWD, "./examples");
const PKG_COMPONENTS = resolve(CWD, "./packages/components");

//  examples安装components
export const installComponents = async () =>
  await execa("pnpm", ["update:pkg"], { cwd: PKG_EMAMPLES });

//  打包components组件
export const buildComponents = async () =>
  await execa("pnpm", ["build"], { cwd: PKG_COMPONENTS });

export async function runTask(taskName: string, task: () => Promise<any>) {
  const spinner = ora().start(`Running ${taskName}`);

  try {
    await task();
    spinner.succeed(`Running ${taskName} done!`);
  } catch (error) {
    spinner.fail(`Running ${taskName} failed!`);
    console.error(error);
  }
}
