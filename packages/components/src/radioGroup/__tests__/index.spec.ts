import { describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { createApp } from "vue";
import EzRadioGroup from "../radioGroup.vue";
import RadioGroup from "..";

describe("radioGroup", () => {
  it("test radioGroup installed", () => {
    const app = createApp({}).use(RadioGroup);
    expect(app.component(RadioGroup.name)).toBeTruthy();
  });
})