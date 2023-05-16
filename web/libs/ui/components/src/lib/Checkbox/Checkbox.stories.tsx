import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Checkbox } from './Checkbox';

export default {
  component: Checkbox,
  title: 'UI_ELEMENTS/Checkbox',
  argTypes: {
    onChange: { action: 'change' },
    color: {
      options: ['primary', 'secondary', 'error', 'warning', 'success'],
      control: {
        type: 'select', // Type 'select' is automatically inferred when 'options' is defined
      },
    },
  },
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => (
  <Checkbox {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  color: 'secondary',
};
