import { beforeEach, describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import EzIcon from "../icon.vue";
import Icon from "..";
import { createApp } from "vue";
import { readFileSync } from "fs";
import { resolve } from "path";
import { trigger } from "@/_utils/vitest";

const CWD = process.cwd();

const ICONFONT_PATH = resolve(CWD + "/src/_iconfont/iconfont.js");

const content = readFileSync(ICONFONT_PATH, "utf-8");

beforeEach(() => {
  //  坑：iconfont.js直接用了window，node环境需要将happy-dom的window, document塞进去
  //  解决方案：通过readFile读取iconfont.js，然后用eval把window,document塞进去
  vi.mock("@/_iconfont/iconfont.js", () => ({
    default: () => {
      eval(`
        const {Window} = require("happy-dom");
        window = new Window();
        document = window.document;

        (
          function(window, document) {
            let s = document.createElement("script");
            document.body.appendChild(s);
            ${content}
          }
        )(
          window,document
        )
      `);
    },
  }));
});

describe("icon", () => {
  it("test icon installed", () => {
    const app = createApp({}).use(Icon);
    expect(app.component(Icon.name)).toBeTruthy();
  });

  it("test icon onClick trigger", async () => {
    const onClick = vi.fn(() => {});

    const wrapper = mount(EzIcon, {
      props: {
        onClick,
      },
    });

    await trigger(wrapper, "click");
    expect(onClick).toHaveBeenCalledTimes(1);
    wrapper.unmount();
  });

  describe("test icon component props", () => {
    it("test name", () => {
      const wrapper = mount(EzIcon, {
        props: {
          name: "ez-help",
        },
      });

      expect(wrapper.find("use").attributes()["href"]).toContain("#ez-help");
      wrapper.unmount();
    });

    it("test size", () => {
      const conditions = [24, "24px", "100%", "24vw"];
      const exp = ["24px", "24px", "100%", "24vw"];

      conditions.forEach((condition, index) => {
        const wrapper = mount(EzIcon, {
          props: {
            name: "ez-help",
            size: condition,
          },
        });

        expect(wrapper.attributes()["style"]).toContain(
          `font-size: ${exp[index]}`
        );
        wrapper.unmount();
      });
    });

    it("test color", () => {
      const conditions = ["yellow", "blue", "red"];

      conditions.forEach((condition) => {
        const wrapper = mount(EzIcon, {
          props: {
            name: "ez-help",
            color: condition,
          },
        });

        expect(wrapper.attributes()["style"]).toContain(`color: ${condition}`);
        wrapper.unmount();
      });
    });
  });
});
