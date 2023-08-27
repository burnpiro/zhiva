import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FrameRateSelect } from './FrameRateSelect';
import { FrameRateControl } from './FrameRateControl';

export default {
  component: FrameRateControl,
  title: 'Menu/FrameRateControl',
  argTypes: {
    onFrameRateChange: { action: 'setFrameRate' },
    onResetFrames: { action: 'resetFrames'},
    onIsPlayingChange: { action: 'isPlaying'},
  },
  args: {
    isPlaying: false,
    disabled: false,
    frameRate: 5
  }
} as ComponentMeta<typeof FrameRateControl>;

const Template: ComponentStory<typeof FrameRateControl> = (args) => (
  <FrameRateControl {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
