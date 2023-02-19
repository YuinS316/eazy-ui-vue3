import { describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { createApp } from "vue";
import EzPopover from "../popover.vue";
import Popover from "..";

describe("popover", () => {
  it("test popover installed", () => {
    const app = createApp({}).use(Popover);
    expect(app.component(Popover.name)).toBeTruthy();
  });
})