import { RadioProps } from "@/radio/props";
import { defineListenerProps } from "@/_utils";
import { ExtractPropTypes, PropType } from "vue";

export const radioGroupProps = {
  modelValue: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array as PropType<RadioProps[]>,
  },
  onChange: defineListenerProps<(value: unknown) => void>(),
};

export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>;
