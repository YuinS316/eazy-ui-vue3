<script lang="ts">
import "./styles/index.sass";
import { defineComponent, ref } from "vue";
import { buttonProps } from "./types";
import { createNamespace, call } from "@/_utils/index";

export default defineComponent({
  name: "EzButton",
  props: buttonProps,
  setup(props) {
    const { n, cls } = createNamespace("button");

    const handleClick = (e: Event) => {
      const { onClick, disabled } = props;
      if (!onClick || disabled) return;

      call(onClick, e);
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
        [block, n('$--block'), n('$--inline-block')],
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
