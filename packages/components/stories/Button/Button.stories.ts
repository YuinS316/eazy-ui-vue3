import EzButton from "../../src/button/index";
import { ButtonType, ButtonSize } from "../../src/button/types";
import { Meta, StoryFn } from "@storybook/vue3";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/vue/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "EzButton",
  component: EzButton,
  argTypes: {
    type: {
      options: ButtonType,
      control: { type: "radio" },
    },
    size: {
      options: ButtonSize,
      control: { type: "radio" },
    },
    round: {
      options: [true, false],
      control: { type: "radio" },
    },
    disabled: {
      options: [true, false],
      control: { type: "radio" },
    },
  },
} as Meta<typeof EzButton>;

const Template: StoryFn<typeof EzButton> = (args) => ({
  components: { EzButton },
  setup() {
    return { args };
  },
  template: '<ez-button v-bind="args">button</ez-button>',
});

export const Primary = Template.bind({});
Primary.args = {
  type: "primary",
  size: "normal",
  disabled: false,
  round: false,
};

export const Large = Template.bind({});
Large.args = { type: "default", size: "large", disabled: true, round: true };
