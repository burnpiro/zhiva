import { ComponentStory, ComponentMeta } from '@storybook/react';
import MemoryIcon from '@mui/icons-material/Memory';
import ComputerIcon from '@mui/icons-material/Computer';
import { IconButton } from './IconButton';

const icons = {
  ChipIcon: <MemoryIcon fontSize="inherit" />,
  ComputerIcon: <ComputerIcon fontSize="inherit" />,
  TextIcon: '📷',
};

export default {
  component: IconButton,
  title: 'UI_ELEMENTS/IconButton',
  argTypes: {
    onClick: { action: 'clicked' },
    children: {
      options: Object.keys(icons), // An array of serializable values
      mapping: icons, // Maps serializable option values to complex arg values
      control: {
        type: 'select', // Type 'select' is automatically inferred when 'options' is defined
      },
    },
  },
  args: {
    children: icons.ChipIcon,
    color: 'primary',
    size: 'medium',
    edge: false,
  },
} as ComponentMeta<typeof IconButton>;

const Template: ComponentStory<typeof IconButton> = (args) => (
  <IconButton {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  color: 'primary',
};
