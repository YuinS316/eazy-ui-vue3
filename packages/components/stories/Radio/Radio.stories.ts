import EzRadio from "../../src/radio/index";
import { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "EzRadio",
  component: EzRadio,
  argTypes: {},
} as Meta<typeof EzRadio>;

const Template: StoryFn<typeof EzRadio> = (args) => ({
  components: { EzRadio },
  setup() {
    return { args };
  },
  template: '<ez-radio v-bind="args"></ez-radio>',
});

export const Basic = Template.bind({});
Basic.args = {};
