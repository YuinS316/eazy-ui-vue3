---
to: src/<%= name %>/<%= name %>.vue
---
<script lang="ts">
import "./styles/index.sass";
import { defineComponent } from "vue";
import { <%= name %>Props } from "./props";
import { createNamespace, call } from "@/_utils/index";

export default defineComponent({
  name: "Ez<%= h.capitalize(name) %>",
  props: <%= name %>Props,
  setup(props) {
    const { n, cls } = createNamespace("<%= name %>");
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