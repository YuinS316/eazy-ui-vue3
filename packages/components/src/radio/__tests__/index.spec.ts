import { describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { createApp } from "vue";
import EzRadio from "../radio.vue";
import Radio from "..";

describe("radio", () => {
  it("test radio installed", () => {
    const app = createApp({}).use(Radio);
    expect(app.component(Radio.name)).toBeTruthy();
  });
})