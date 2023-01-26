import EzButton from "../../src/button/index";
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
      options: ["default", "primary", "success", "danger", "warning"],
      control: { type: "radio" },
    },
  },
} as Meta<typeof EzButton>;

const Template: StoryFn<typeof EzButton> = (args) => ({
  components: { EzButton },
  setup() {
    return { args };
  },
  template: '<ez-button v-bind="args">template</ez-button>',
});

export const Primary = Template.bind({});
Primary.args = { type: "primary" };
