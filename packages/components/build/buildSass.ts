import cpy from "cpy";
import { resolve, dirname } from "path";
import { promises as fs } from "fs";
import sass from "sass";
import glob from "fast-glob";
const sourceDir = resolve(__dirname, "../src");
//lib文件目录
const targetLib = resolve(__dirname, "../lib");
//es文件目录
const targetEs = resolve(__dirname, "../es");

//src目录

const srcDir = resolve(__dirname, "../src");

const buildSass = async () => {
  //直接将sass文件复制到打包后目录
  await cpy(`${sourceDir}/**/*.sass`, targetLib);
  await cpy(`${sourceDir}/**/*.sass`, targetEs);

  //获取打包后.sass文件目录(lib和es一样)
  const sassFiles = await glob("**/*.sass", { cwd: srcDir, onlyFiles: true });

  //遍历含有sass的目录
  for (let path in sassFiles) {
    const filePath = `${srcDir}/${sassFiles[path]}`;
    //获取sass文件字符串
    // const sassCode = await fs.readFile(filePath, "utf-8");
    //将sass解析成css

    const code = await sass.compile(filePath, {
      //指定src下对应sass文件的文件夹为目录
      loadPaths: [srcDir, dirname(filePath)],
    });

    //拿到.css后缀path
    const cssPath = sassFiles[path].replace(".sass", ".css");

    //将css写入对应目录
    await fs.writeFile(resolve(targetLib, cssPath), code.css);
    await fs.writeFile(resolve(targetEs, cssPath), code.css);
  }
};
buildSass();
