import EzPopover from "../../src/popover/index";
import { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "EzPopover",
  component: EzPopover,
  argTypes: {
    placement: {
      control: {
        type: "select",
        options: [
          "top",
          "top-start",
          "top-end",
          "bottom",
          "bottom-start",
          "bottom-end",
          "right",
          "right-start",
          "right-end",
          "left",
          "left-start",
          "left-end",
        ],
      },
      offset: {
        control: {
          type: "number",
          min: 0,
          max: 50,
          step: 1,
        },
      },
    },
  },
} as Meta<typeof EzPopover>;

const Template: StoryFn<typeof EzPopover> = (args) => ({
  components: { EzPopover },
  setup() {
    return { args };
  },
  template:
    '<ez-popover v-bind="args"><div style="border: 1px solid #000;">btn</div></ez-popover>',
});

export const Basic = Template.bind({});
Basic.args = {
  placement: "bottom",
  offset: 10,
};
