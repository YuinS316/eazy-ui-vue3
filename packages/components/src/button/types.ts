import { ExtractPropTypes } from "vue";

export const ButtonType = ["default", "primary", "success"];

export const ButtonSize = ["large", "normal", "small"];

export const buttonProps = {
  type: {
    type: String,
    values: ButtonType,
  },
  size: {
    type: String,
    values: ButtonSize,
  },
};

export type ButtonProps = ExtractPropTypes<typeof buttonProps>;
