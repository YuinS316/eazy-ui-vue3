import EzRadioGroup from "../../src/radioGroup/index";
import { Meta, StoryFn } from "@storybook/vue3";
import { ref } from "vue";

export default {
  title: "EzRadioGroup",
  component: EzRadioGroup,
  argTypes: {
    disabled: {
      control: {
        options: [true, false],
        control: { type: "radio" },
      },
    },
  },
} as Meta<typeof EzRadioGroup>;

const Template: StoryFn<typeof EzRadioGroup> = (args) => ({
  components: { EzRadioGroup },
  setup() {
    const value = ref("");
    const handleChange = (val: any) => {
      console.log("chnage--", val);
    };
    return { args, value, handleChange };
  },
  template:
    '<ez-radioGroup  v-model="value" v-bind="args" @change="handleChange" ></ez-radioGroup>',
});

export const Basic = Template.bind({});
Basic.args = {
  disabled: false,
  options: [
    {
      label: "s1",
    },
    {
      label: "s2",
    },
  ],
};
