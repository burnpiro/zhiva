import { ComponentStory, ComponentMeta } from '@storybook/react';
import { LoadingOverlay } from './LoadingOverlay';
import MemoryIcon from '@mui/icons-material/Memory';
import ComputerIcon from '@mui/icons-material/Computer';
import React from 'react';

const icons: Record<string, React.ReactElement> = {
  ChipIcon: <MemoryIcon />,
  ComputerIcon: <ComputerIcon />,
};

export default {
  component: LoadingOverlay,
  title: 'VIEWER/LoadingOverlay',
  argTypes: {
    percentComplete: { type: 'number', min: 0, max: 100, step: 1 },
  },
  args: {
    percentComplete: 20,
  },
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof LoadingOverlay>;

const Template: ComponentStory<typeof LoadingOverlay> = (args) => (
  <LoadingOverlay {...args} />
);

export const Primary = Template.bind({});
Primary.args = {

};


export const WithError = Template.bind({});
WithError.args = {
  error: 'Unexpected Error'
};
