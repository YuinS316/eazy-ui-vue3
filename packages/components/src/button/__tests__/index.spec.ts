import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import Button from "../button.vue";

describe("Button", () => {
  it("should render slot", () => {
    const wrapper = mount(Button, {
      slots: {
        default: "test btn",
      },
    });

    expect(wrapper.text()).toContain("test btn");
  });
});
