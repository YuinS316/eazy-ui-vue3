import { ExtractPropTypes } from "vue";

export const ButtonType = [
  "default",
  "primary",
  "success",
  "danger",
  "warning",
];

export const ButtonSize = ["large", "normal", "small", "mini"];

export const buttonProps = {
  type: {
    type: String,
    values: ButtonType,
    default: "default",
  },
  size: {
    type: String,
    values: ButtonSize,
    default: "normal",
  },
  round: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
};

export type ButtonProps = ExtractPropTypes<typeof buttonProps>;
