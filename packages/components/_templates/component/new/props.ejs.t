---
to: src/<%= name %>/props.ts
---
import { defineListenerProps } from "@/_utils";
import { ExtractPropTypes } from "vue";

export const <%= name %>Props = {
  
}

export type <%= h.capitalize(name) %>Props = ExtractPropTypes<typeof <%= name %>Props>;