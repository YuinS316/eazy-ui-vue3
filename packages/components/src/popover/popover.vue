<script lang="ts">
import "./styles/index.sass";
import { defineComponent } from "vue";
import { popoverProps } from "./props";
import { createNamespace, call } from "@/_utils/index";
import { usePopover } from "./usePopover";

export default defineComponent({
  name: "EzPopover",
  props: popoverProps,
  setup(props) {
    const { n, cls } = createNamespace("popover");

    const {
      show,
      hostRef,
      popoverRef,
      handleHostMouseEnter,
      handleHostMouseLeave,
      handleHostClick,
      handlePopoverMouseEnter,
      handlePopoverMouseLeave,
    } = usePopover(props);

    return {
      cls,
      n,
      show,
      hostRef,
      popoverRef,
      handleHostMouseEnter,
      handleHostMouseLeave,
      handleHostClick,
      handlePopoverMouseEnter,
      handlePopoverMouseLeave,
    };
  },
});
</script>

<template>
  <div
    ref="hostRef"
    :class="cls(n(), n('$--box'), n('$--pointer'))"
    @click="handleHostClick"
    @mouseenter="handleHostMouseEnter"
    @mouseleave="handleHostMouseLeave"
  >
    <slot></slot>

    <teleport :to="teleport">
      <transition :name="n()">
        <div
          ref="popoverRef"
          :class="n('popper')"
          v-show="show"
          @mouseenter="handlePopoverMouseEnter"
          @mouseleave="handlePopoverMouseLeave"
        >
          <div :class="cls(n('content-cotainer'))">
            <slot name="content"> slot-content </slot>
          </div>
        </div>
      </transition>
    </teleport>
  </div>
</template>
