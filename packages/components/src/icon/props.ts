import { defineListenerProps } from "@/_utils";
import { ExtractPropTypes } from "vue";

export const iconProps = {
  name: {
    type: String,
  },
  size: {
    type: [Number, String],
  },
  color: {
    type: String,
  },
  onClick: defineListenerProps<(e: Event) => void>(),
};

export type IconProps = ExtractPropTypes<typeof iconProps>;
