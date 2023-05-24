import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FormHelperText } from './FormHelperText';
import { TextField } from '../TextField/TextField';
import FormControl from './FormControl';

export default {
  component: FormHelperText,
  title: 'UI_ELEMENTS/FormHelperText',
  args: {
    children: 'Helper text for input',
  },
} as ComponentMeta<typeof FormHelperText>;

const Template: ComponentStory<typeof FormHelperText> = (args) => (
  <FormControl>
    <TextField />
    <FormHelperText {...args} />
  </FormControl>
);

export const Primary = Template.bind({});
Primary.args = {};
