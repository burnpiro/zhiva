import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FormControl } from './FormControl';
import TextField from '../TextField/TextField';

export default {
  component: FormControl,
  title: 'UI_ELEMENTS/FormControl',
  args: {
    children: <TextField value={'Text'} />,
  },
} as ComponentMeta<typeof FormControl>;

const Template: ComponentStory<typeof FormControl> = (args) => (
  <FormControl {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
