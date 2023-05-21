import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Select } from './Select';
import { MenuItem } from './MenuItem';
import FormControl from '../FormControl/FormControl';

export default {
  component: Select,
  title: 'UI_ELEMENTS/Select',
  args: {
    value: 1,
  },
  argTypes: { onChange: { action: 'changed' } },
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => (
  <FormControl sx={{ m: 1, minWidth: 120 }}>
    <Select {...args}>
      <MenuItem value={1}>Item 1</MenuItem>
      <MenuItem value={2}>Item 2</MenuItem>
      <MenuItem value={3}>Item 3</MenuItem>
      <MenuItem value={4}>Item 4</MenuItem>
      <MenuItem value={5}>Item 5</MenuItem>
    </Select>
  </FormControl>
);

export const Primary = Template.bind({});
Primary.args = {};
