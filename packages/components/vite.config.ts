/// <reference types="vitest" />
import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import autoprefixer from "autoprefixer";

function _resolve(dir: string) {
  return resolve(__dirname, dir);
}

export default defineConfig({
  resolve: {
    alias: {
      "@": _resolve("src"),
    },
  },
  test: {
    environment: "happy-dom",
  },
  // base: "./",
  build: {
    target: "modules",
    //打包文件目录
    outDir: "es",
    //压缩
    minify: false,
    //css分离
    //cssCodeSplit: true,
    // emptyOutDir: true,
    rollupOptions: {
      //忽略打包vue文件
      external: ["vue", /\.sass/],
      input: ["src/index.ts"],
      output: [
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
  css: {
    postcss: {
      plugins: [autoprefixer],
    },
  },
  plugins: [
    vue(),
    dts({
      entryRoot: "./src",
      tsConfigFilePath: "./tsconfig.json",
    }),
    dts({
      entryRoot: "./src",
      outputDir: "lib",
      tsConfigFilePath: "./tsconfig.json",
    }),
    {
      name: "style",
      generateBundle(config, bundle) {
        //这里可以获取打包后的文件目录以及代码code
        const keys = Object.keys(bundle);

        const fixCssLocation = (code: string) => {
          return code
            .replace("../components/src/", "../")
            .replace(/\.sass/g, ".css");
        };

        for (const key of keys) {
          const bundler: any = bundle[key as any];
          //rollup内置方法,将所有输出文件code中的.less换成.css,因为我们当时没有打包less文件
          // console.log("style---", key);
          this.emitFile({
            type: "asset",
            fileName: key, //文件名名不变
            source: fixCssLocation(bundler.code),
          });
        }
      },
    },
  ],
});
