import { ComponentStory, ComponentMeta } from '@storybook/react';
import { InputLabel } from './InputLabel';
import FormControl from './FormControl';
import MenuItem from '../Select/MenuItem';
import Select from '../Select/Select';

export default {
  component: InputLabel,
  title: 'UI_ELEMENTS/InputLabel',
  args: {
    children: 'Select Label',
  },
} as ComponentMeta<typeof InputLabel>;

const Template: ComponentStory<typeof InputLabel> = (args) => (
  <FormControl sx={{ m: 1, minWidth: 120 }}>
    <InputLabel id="select-label" {...args} />
    <Select
      value={1}
      labelId="select-label"
      id="demo-select"
      variant={'standard'}
    >
      <MenuItem value={1}>Item 1</MenuItem>
    </Select>
  </FormControl>
);

export const Primary = Template.bind({});
Primary.args = {};
