<script lang="ts">
import "./styles/index.sass";
import { defineComponent, ref } from "vue";
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
      ...cls(
        n(),
        n('$--box'),
        n('$--inline-block'),
        n(`--${type}`),
        n(`--${size}`),
        [round, n('--rounded')],
        [disabled, n('--disabled')]
      ),
    ]"
    @click="handleClick"
  >
    <div :class="cls(n('content'))">
      <slot></slot>
    </div>
  </button>
</template>
