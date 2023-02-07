<script lang="ts">
import "./styles/index.sass";
import { defineComponent, unref } from "vue";
import { radioProps } from "./props";
import { createNamespace, call } from "@/_utils/index";
import { computed } from "@vue/reactivity";

export default defineComponent({
  name: "EzRadio",
  props: radioProps,
  setup(props, { emit }) {
    const { n, cls } = createNamespace("radio");

    const model = computed({
      get() {
        return props.modelValue;
      },
      set(newVal) {
        emit("update:modelValue", newVal);
      },
    });

    const computedValue = computed(() => props.checkedValue || props.label);

    const isChecked = computed(() => model.value === computedValue.value);

    const handleChange = () => {
      const { onChange, disabled } = props;

      if (disabled) return;

      model.value = computedValue.value;

      if (!onChange) return;

      call(onChange, model.value);
    };

    return {
      cls,
      n,
      model,
      computedValue,
      isChecked,
      handleChange,
    };
  },
});
</script>

<template>
  <label :class="cls(n(), n('$--box'), [disabled, n('--disabled')])">
    <input
      type="radio"
      :class="cls(n('--input'))"
      :value="computedValue"
      :checked="isChecked"
      @change="handleChange"
    />
    <div :class="cls(n('--dot-wrapper'))">
      <div :class="cls(n('--dot'), [isChecked, n('--dot__checked')])"></div>
    </div>
    <div :class="cls(n('--label'))">
      <slot>{{ label || (isChecked ? checkedValue : uncheckedValue) }}</slot>
    </div>
  </label>
</template>
