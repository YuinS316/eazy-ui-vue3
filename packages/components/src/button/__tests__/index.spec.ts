import { describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { createApp } from "vue";
import EzButton from "../button.vue";
import Button from "..";
import { ButtonType, ButtonSize } from "../props";
import { trigger } from "@/_utils/vitest";

describe("button", () => {
  it("test button installed", () => {
    const app = createApp({}).use(Button);
    expect(app.component(Button.name)).toBeTruthy();
  });

  it("test button render slot", () => {
    const wrapper = mount(EzButton, {
      slots: {
        default: "test btn",
      },
    });

    expect(wrapper.text()).toContain("test btn");
    wrapper.unmount();
  });

  it("test button onClick trigger", async () => {
    const onClick = vi.fn(() => {});

    const wrapper = mount(EzButton, {
      props: {
        onClick,
      },
    });

    await trigger(wrapper, "click");
    expect(onClick).toHaveBeenCalledTimes(1);
    wrapper.unmount();
  });

  describe("test button component props", () => {
    it("test button type", () => {
      ButtonType.forEach((type) => {
        const wrapper = mount(EzButton, {
          props: {
            type,
          },
        });

        expect(wrapper.find("button").classes()).toContain(
          `ez-button--${type}`
        );

        wrapper.unmount();
      });
    });

    it("test button size", () => {
      ButtonSize.forEach((size) => {
        const wrapper = mount(EzButton, {
          props: {
            size,
          },
        });

        expect(wrapper.find("button").classes()).toContain(
          `ez-button--${size}`
        );

        wrapper.unmount();
      });
    });

    it("test round", () => {
      const wrapper = mount(EzButton, {
        props: {
          round: true,
        },
      });

      expect(wrapper.find("button").classes()).toContain(`ez-button--rounded`);

      wrapper.unmount();

      const wrapperFalse = mount(EzButton, {
        props: {
          round: false,
        },
      });

      expect(wrapperFalse.find("button").classes()).not.toContain(
        `ez-button--rounded`
      );

      wrapperFalse.unmount();
    });

    it("test block", () => {
      const wrapperTrue = mount(EzButton, {
        props: {
          block: true,
        },
      });

      expect(wrapperTrue.find("button").classes()).toContain(`ez--block`);

      wrapperTrue.unmount();

      const wrapperFalse = mount(EzButton, {
        props: {
          block: false,
        },
      });

      expect(wrapperFalse.find("button").classes()).toContain(
        `ez--inline-block`
      );

      wrapperFalse.unmount();
    });
  });
});
