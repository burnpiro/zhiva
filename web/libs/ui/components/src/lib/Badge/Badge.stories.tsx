import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Badge } from './Badge';
import MemoryIcon from '@mui/icons-material/Memory';
import { Button } from '@zhiva/ui-components';

const inputs = {
  Icon: <MemoryIcon fontSize="medium" />,
  Text: 'Some Text',
  TextIcon: '📷',
  Button: <Button variant={'outlined'}>Button</Button>,
};

export default {
  component: Badge,
  title: 'UI_ELEMENTS/Badge',
  argTypes: {
    onClick: { action: 'clicked' },
    children: {
      options: Object.keys(inputs), // An array of serializable values
      mapping: inputs, // Maps serializable option values to complex arg values
      control: {
        type: 'select', // Type 'select' is automatically inferred when 'options' is defined
      },
    },
  },
  args: {
    children: inputs.Icon,
    color: 'secondary',
    badgeContent: '5',
    variant: 'standard',
    overlap: 'rectangular',
  },
} as ComponentMeta<typeof Badge>;

const Template: ComponentStory<typeof Badge> = (args) => <Badge {...args} />;

export const IconBadge = Template.bind({});
IconBadge.args = {};

export const TextBadge = Template.bind({});
TextBadge.args = {
  children: inputs.Text,
};

export const TextIcon = Template.bind({});
TextIcon.args = {
  children: inputs.TextIcon,
};

export const WithButton = Template.bind({});
WithButton.args = {
  children: inputs.Button,
};
