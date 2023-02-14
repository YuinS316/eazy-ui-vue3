<script lang="ts">
import "./styles/index.sass";
import { computed, defineComponent, ref, watch } from "vue";
import { radioGroupProps } from "./props";
import { createNamespace, call } from "@/_utils/index";
import EzRadio from "../radio/radio.vue";
import { useVModel } from "@/_hooks/useVModel";

export default defineComponent({
  name: "EzRadioGroup",
  props: radioGroupProps,
  components: { EzRadio },
  setup(props, { emit }) {
    const { n, cls } = createNamespace("radioGroup");

    const computedValue = useVModel(props, "modelValue", emit);

    watch(computedValue, () => {
      handleChange();
    });

    const handleChange = () => {
      const { onChange, disabled } = props;

      if (disabled || !onChange) return;

      onChange(computedValue.value);
    };

    return {
      cls,
      n,
      computedValue,
    };
  },
});
</script>

<template>
  <div :class="cls(n(), n('$--box'))">
    <template v-for="option in options">
      <ez-radio
        v-bind="option"
        v-model="computedValue"
        :disabled="disabled"
      ></ez-radio>
    </template>
  </div>
</template>
