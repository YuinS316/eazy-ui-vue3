import { describe, expect, it, vi } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import { createApp } from "vue";
import EzRadio from "../radio.vue";
import Radio from "..";
import { trigger } from "@/_utils/vitest";

describe("radio", () => {
  it("test radio installed", () => {
    const app = createApp({}).use(Radio);
    expect(app.component(Radio.name)).toBeTruthy();
  });

  it("test radio slot", () => {
    const wrapper = mount(EzRadio, {
      slots: {
        default: "test radio",
      },
    });

    expect(wrapper.text()).toContain("test radio");
    wrapper.unmount();
  });

  it("test radio change", async () => {
    const onChange = vi.fn(() => {});

    const wrapper = mount(EzRadio, {
      props: {
        onChange,
        label: "test",
        modelValue: "",
      },
    });

    await wrapper.find("input").trigger("change");
    expect(onChange).toHaveBeenCalledTimes(1);
    wrapper.unmount();
  });

  describe("test radio component props", () => {
    const shouldBeChecked = (wrapper: VueWrapper) => {
      expect(wrapper.find(".ez-radio--dot").classes()).toContain(
        "ez-radio--dot__checked"
      );
    };

    const shouldNotBeChecked = (wrapper: VueWrapper) => {
      expect(wrapper.find(".ez-radio--dot").classes()).not.toContain(
        "ez-radio--dot__checked"
      );
    };

    const shouldContainText = (wrapper: VueWrapper, text: string) => {
      expect(wrapper.text()).toContain(text);
    };

    it("test label", async () => {
      const label = "test-label";

      const wrapper = mount(EzRadio, {
        props: {
          label,
          modelValue: "",
        },
      });

      //  At first, it is not checked
      shouldNotBeChecked(wrapper);
      shouldContainText(wrapper, label);

      //  After modelValue equals to label, it will be checked
      await wrapper.setProps({
        modelValue: label,
      });
      shouldBeChecked(wrapper);

      //  And modelValue changes to another, it will be not checked
      await wrapper.setProps({
        modelValue: "test-other",
      });
      shouldNotBeChecked(wrapper);

      wrapper.unmount();
    });

    it("test label and checkedValue", async () => {
      const label = "test-label";
      const checkedValue = "test-true";

      const wrapper = mount(EzRadio, {
        props: {
          label,
          checkedValue,
          modelValue: "",
        },
      });

      shouldNotBeChecked(wrapper);
      shouldContainText(wrapper, label);

      await wrapper.setProps({
        modelValue: label,
      });

      //  if label exsist, the content will always be label's value
      shouldNotBeChecked(wrapper);
      shouldContainText(wrapper, label);

      await wrapper.setProps({
        modelValue: checkedValue,
      });

      shouldBeChecked(wrapper);
      shouldContainText(wrapper, label);

      wrapper.unmount();
    });

    it("test checkedValue and uncheckedValue", async () => {
      const uncheckedValue = "test-false";
      const checkedValue = "test-true";

      const wrapper = mount(EzRadio, {
        props: {
          uncheckedValue,
          checkedValue,
          modelValue: "",
        },
      });

      shouldNotBeChecked(wrapper);
      shouldContainText(wrapper, uncheckedValue);

      await wrapper.setProps({
        modelValue: checkedValue,
      });

      shouldBeChecked(wrapper);
      shouldContainText(wrapper, checkedValue);

      wrapper.unmount();
    });

    it("test disabled", async () => {
      const label = "test-label";

      const onChange = vi.fn(() => {});

      const wrapper = mount(EzRadio, {
        props: {
          label,
          modelValue: "",
          onChange,
          disabled: true,
        },
      });

      expect(wrapper.classes()).toContain("ez-radio--disabled");

      //  it's not allow to dispatch onChange when radio has been set disabled
      await wrapper.find("input").trigger("change");
      expect(onChange).toHaveBeenCalledTimes(0);

      wrapper.unmount();
    });
  });
});
