---
to: src/<%= name %>/__tests__/index.spec.ts
---
import { describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { createApp } from "vue";
import Ez<%= h.capitalize(name) %> from "../<%= name %>.vue";
import <%= h.capitalize(name) %> from "..";

describe("<%= name %>", () => {
  it("test <%= name %> installed", () => {
    const app = createApp({}).use(<%= h.capitalize(name) %>);
    expect(app.component(<%= h.capitalize(name) %>.name)).toBeTruthy();
  });
})