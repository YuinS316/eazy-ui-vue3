<script lang="ts">
import "./styles/index.sass";
import { defineComponent } from "vue";
import { buttonProps } from "./types";
import { createNamespace } from "@/_utils/index";

export default defineComponent({
  name: "EzButton",
  props: buttonProps,
  emits: ["onClick"],
  setup(props, { emit }) {
    const { n, cls } = createNamespace("button");

    const handleClick = (e: Event) => {
      emit("onClick", e);
    };

    return {
      cls,
      n,
      handleClick,
    };
  },
});
</script>

<template>
  <button
    :class="[
      ...cls(n(), n('$--box'), n('$--inline-block')),
      n(`--${type}`),
      n(`--${size}`),
    ]"
    @click="handleClick"
  >
    <div :class="cls(n('content'))">
      <slot>test</slot>
    </div>
  </button>
</template>
