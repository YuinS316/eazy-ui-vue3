import EzRadio from "../../src/radio/index";
import { Meta, StoryFn } from "@storybook/vue3";
import { ref } from "vue";

export default {
  title: "EzRadio",
  component: EzRadio,
  argTypes: {},
} as Meta<typeof EzRadio>;

const Template: StoryFn<typeof EzRadio> = (args) => ({
  components: { EzRadio },
  setup() {
    const val = ref(false);
    const handleChange = (val) => {
      console.log("change--", val);
    };
    return { args, val, handleChange };
  },
  template: `
    <ez-radio v-model="val" v-bind="args" checkedValue="r1" uncheckedValue="ur1" @change="handleChange"></ez-radio>
    <ez-radio v-model="val" v-bind="args" checkedValue="r2" uncheckedValue="ur2"></ez-radio>
    <div>val -- {{val}}</div>
    `,
});

export const Basic = Template.bind({});
Basic.args = {};
