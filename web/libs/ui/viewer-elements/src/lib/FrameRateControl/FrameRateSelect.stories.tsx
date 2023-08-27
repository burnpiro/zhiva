import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FrameRateSelect } from './FrameRateSelect';

export default {
  component: FrameRateSelect,
  title: 'Menu/FrameRateSelect',
  argTypes: {
    onChange: { action: 'select' },
  },
  args: {
    values: [1, 5, 10, 15, 20, 25, 30, 60]
  }
} as ComponentMeta<typeof FrameRateSelect>;

const Template: ComponentStory<typeof FrameRateSelect> = (args) => (
  <FrameRateSelect {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
