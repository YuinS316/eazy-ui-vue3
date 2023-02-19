import { defineListenerProps } from "@/_utils";
import { ExtractPropTypes, PropType, TeleportProps } from "vue";

export type Placement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "right"
  | "right-start"
  | "right-end"
  | "left"
  | "left-start"
  | "left-end";

function triggerValidator(trigger: string) {
  return ["click", "hover"].includes(trigger);
}

function placementValidator(type: string) {
  const direction = ["top", "bottom", "left", "right"];
  const subDirection = ["", "start", "end"];

  const result: string[] = [];
  direction.forEach((i) => {
    subDirection.forEach((j) => {
      result.push(j === "" ? i : `${i}-${j}`);
    });
  });

  return result.includes(type);
}

export const popoverProps = {
  modelValue: {
    type: Boolean,
    default: false,
  },
  offset: {
    type: Number,
    default: 10,
  },
  trigger: {
    type: String as PropType<"click" | "hover">,
    default: "hover",
    validator: triggerValidator,
  },
  placement: {
    type: String as PropType<Placement>,
    default: "bottom",
    validator: placementValidator,
  },
  teleport: {
    type: [String, Object] as PropType<TeleportProps["to"]>,
    default: "body",
  },
  "onUpdate:modelValue": defineListenerProps<(show: boolean) => void>(),
};

export type PopoverProps = ExtractPropTypes<typeof popoverProps>;
