import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from './Button';

export default {
  component: Button,
  title: 'UI_ELEMENTS/Button',
  argTypes: { onClick: { action: 'clicked' } },
  args: {
    children: 'Button',
    size: 'medium',
    color: 'primary',
    fullWidth: false,
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Text = Template.bind({});
Text.args = {
  variant: 'text',
};

export const Outlined = Template.bind({});
Outlined.args = {
  variant: 'outlined',
};

export const Contained = Template.bind({});
Contained.args = {
  variant: 'contained',
};
