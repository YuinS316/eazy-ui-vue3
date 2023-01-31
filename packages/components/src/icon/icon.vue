<script lang="ts">
import "./styles/index.sass";
import "@/_iconfont/iconfont.js";
import { computed, defineComponent } from "vue";
import { iconProps } from "./props";
import { call, createNamespace } from "@/_utils";

export default defineComponent({
  name: "EzIcon",
  props: iconProps,
  setup(props) {
    const { n, cls } = createNamespace("icon");

    const iconName = computed(() =>
      props.name?.startsWith("ez") ? `#${props.name}` : `#ez-${props.name}`
    );

    const calcSize = computed(() =>
      typeof props.size === "number" ? props.size + "px" : props.size
    );

    const handleClick = (e: Event) => {
      const { onClick } = props;

      if (!onClick) return;
      call(onClick, e);
    };

    return {
      iconName,
      calcSize,
      n,
      cls,
      handleClick,
    };
  },
});
</script>

<template>
  <svg
    class="icon"
    :class="cls(n(), n('$--inline-block'), n('$--pointer'))"
    :style="{
      color,
      fontSize: calcSize,
    }"
    aria-hidden="true"
    @click="handleClick"
  >
    <use :xlink:href="iconName"></use>
  </svg>
</template>
