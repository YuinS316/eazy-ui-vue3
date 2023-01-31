<script lang="ts">
import "./styles/index.sass";
import { defineComponent } from "vue";
import { radioProps } from "./props";
import { createNamespace, call } from "@/_utils/index";

export default defineComponent({
  name: "EzRadio",
  props: radioProps,
  setup(props) {
    const { n, cls } = createNamespace("radio");
    return {
      cls,
      n,
    };
  }
})
</script>

<template>
  <div
    :class="
      cls(
        n(),
        n('$--box'),
      )
    "
  >
  </div>
</template>