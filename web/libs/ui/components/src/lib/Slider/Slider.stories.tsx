import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Slider } from './Slider';
import FormControl from '../FormControl/FormControl';

export default {
  component: Slider,
  title: 'UI_ELEMENTS/Slider',
  argTypes: { onChange: { action: 'changed' } },
  args: {
    value: 15,
    min: 1,
    max: 40,
    step: 1,
    color: 'primary',
  },
} as ComponentMeta<typeof Slider>;

const Template: ComponentStory<typeof Slider> = (args) => (
  <FormControl sx={{ m: 1, minWidth: 240, height: 240 }}>
    <Slider {...args} />
  </FormControl>
);

export const Default = Template.bind({});
Default.args = {};

export const Vertical = Template.bind({});
Vertical.args = {
  orientation: 'vertical',
};

const marks = [
  {
    value: 0,
    label: '0°C',
  },
  {
    value: 20,
    label: '20°C',
  },
  {
    value: 37,
    label: '37°C',
  },
  {
    value: 100,
    label: '100°C',
  },
];

export const CustomMarks = Template.bind({});
CustomMarks.args = {
  valueLabelDisplay: 'auto',
  marks: marks,
  max: 100,
};

export const CustomMarksRange = Template.bind({});
CustomMarksRange.args = {
  valueLabelDisplay: 'auto',
  marks: marks,
  max: 100,
  value: [20, 40],
};
