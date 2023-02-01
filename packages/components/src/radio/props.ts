import { defineListenerProps } from "@/_utils";
import type { PropType } from "vue";
import { ExtractPropTypes } from "vue";

export const radioProps = {
  modelValue: {
    type: [String, Number, Boolean] as PropType<any>,
    default: false,
  },
  checkedValue: {
    type: [String, Number, Boolean] as PropType<any>,
    default: true,
  },
  uncheckedValue: {
    type: [String, Number, Boolean] as PropType<any>,
    default: false,
  },
  label: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  onChange: defineListenerProps<(value: unknown) => void>(),
};

export type RadioProps = ExtractPropTypes<typeof radioProps>;
