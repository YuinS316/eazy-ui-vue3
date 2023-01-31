---
to: stories/<%= h.capitalize(name) %>/<%= h.capitalize(name) %>.stories.ts
---
import Ez<%= h.capitalize(name) %> from "../../src/<%= name %>/index";
import { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Ez<%= h.capitalize(name) %>",
  component: Ez<%= h.capitalize(name) %>,
  argTypes: {
    
  },
} as Meta<typeof Ez<%= h.capitalize(name) %>>;

const Template: StoryFn<typeof Ez<%= h.capitalize(name) %>> = (args) => ({
  components: { Ez<%= h.capitalize(name) %> },
  setup() {
    return { args };
  },
  template: '<ez-<%= name %> v-bind="args"></ez-<%= name %>>',
});

export const Basic = Template.bind({});
Basic.args = {
};