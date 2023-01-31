import EzIcon from "../../src/icon/index";
import { Meta, StoryFn } from "@storybook/vue3";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/vue/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "EzIcon",
  component: EzIcon,
  argTypes: {
    name: {
      control: {
        type: "select",
        options: ["ez-fabulous", "ez-loading", "ez-help"],
      },
    },
    color: {
      control: {
        type: "color",
        presetColors: ["#3669e7", "#F24405", "#FA7F08"],
      },
    },
    size: {
      control: {
        type: "text",
      },
    },
  },
} as Meta<typeof EzIcon>;

const Template: StoryFn<typeof EzIcon> = (args) => ({
  components: { EzIcon },
  setup() {
    return { args };
  },
  template: '<ez-icon v-bind="args"></ez-icon>',
});

export const Loading = Template.bind({});
Loading.args = {
  name: "ez-loading",
  color: "#000",
  size: "30",
};
