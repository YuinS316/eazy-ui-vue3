import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";

function _resolve(dir: string) {
  return resolve(__dirname, dir);
}

export default defineConfig({
  resolve: {
    alias: {
      "@": _resolve("src"),
    },
  },
  build: {
    target: "modules",
    //打包文件目录
    outDir: "es",
    //压缩
    minify: false,
    sourcemap: true,
    rollupOptions: {
      external: ["vue"],
      input: ["src/index.ts"],
      output: [
        {
          globals: {
            vue: "Vue",
          },
        },
        {
          format: "es",
          //不用打包成.es.js,这里我们想把它打包成.js
          entryFileNames: "[name].js",
          //让打包目录和我们目录对应
          preserveModules: true,
          //配置打包根目录
          dir: "es",
          preserveModulesRoot: "src",
        },
        {
          format: "cjs",
          entryFileNames: "[name].js",
          //让打包目录和我们目录对应
          preserveModules: true,
          //配置打包根目录
          dir: "lib",
          preserveModulesRoot: "src",
        },
      ],
    },
    lib: {
      entry: "./index.ts",
      formats: ["es", "cjs"],
    },
  },
  plugins: [
    dts({
      entryRoot: "./src",
      tsConfigFilePath: "./tsconfig.json",
    }),
    dts({
      entryRoot: "./src",
      outputDir: "lib",
      tsConfigFilePath: "./tsconfig.json",
    }),
  ],
});
