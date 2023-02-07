import EzRadio from "../../src/radio/index";
import { Meta, StoryFn } from "@storybook/vue3";
import { ref } from "vue";

export default {
  title: "EzRadio",
  component: EzRadio,
  argTypes: {
    checkedValue: {
      control: {
        type: "text",
        default: "",
      },
    },
    uncheckedValue: {
      control: {
        type: "text",
        default: "",
      },
    },
    label: {
      control: {
        type: "text",
        default: "",
      },
    },
    disabled: {
      control: {
        options: [true, false],
        control: { type: "radio" },
      },
    },
  },
} as Meta<typeof EzRadio>;

const Template: StoryFn<typeof EzRadio> = (args) => ({
  components: { EzRadio },
  setup() {
    const val = ref("");
    const handleChange = (val: any) => {
      console.log("change--", val);
    };
    return { args, val, handleChange };
  },
  template: `
    <ez-radio v-model="val" v-bind="args" checkedValue="r1" uncheckedValue="ur1" @change="handleChange"></ez-radio>
    <ez-radio v-model="val" v-bind="args"></ez-radio>
    <div>val -- {{val}}</div>
    `,
});

export const Basic = Template.bind({});
Basic.args = {
  checkedValue: "test-true",
  uncheckedValue: "test-false",
  // label: "test-label",
  disabled: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  checkedValue: "test-true",
  uncheckedValue: "test-false",
  // label: "test-label",
  disabled: true,
};
