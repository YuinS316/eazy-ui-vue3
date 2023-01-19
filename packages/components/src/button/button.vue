<script lang="ts">
import "./styles/index.sass";
import { defineComponent } from "vue";
import { buttonProps } from "./types";
import { createNamespace } from "@/_utils/index";

export default defineComponent({
  name: "EzButton",
  props: buttonProps,
  setup() {
    const { n, cls } = createNamespace("button");
    return {
      cls,
      n,
    };
  },
});
</script>

<template>
  <button :class="cls(n())">
    <slot>test</slot>
  </button>
</template>
