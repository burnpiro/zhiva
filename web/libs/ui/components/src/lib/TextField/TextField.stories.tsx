import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TextField } from './TextField';

export default {
  component: TextField,
  title: 'UI_ELEMENTS/TextInput',
  argTypes: {
    onChange: { action: 'changed' },
    variant: {
      options: ['outlined', 'filled', 'standard'],
      control: {
        type: 'select', // Type 'select' is automatically inferred when 'options' is defined
      },
    },
    size: {
      options: ['small', 'medium', 'large'],
      control: {
        type: 'select', // Type 'select' is automatically inferred when 'options' is defined
      },
    },
  },
  args: {
    value: 'Some Text',
    margin: 'none',
    fullWidth: false,
    disabled: false,
    multiline: false,
    maxRows: 4,
    size: 'medium',
  },
} as ComponentMeta<typeof TextField>;

const Template: ComponentStory<typeof TextField> = (args) => (
  <TextField {...args} />
);

export const Outlined = Template.bind({});
Outlined.args = {
  label: 'Outlined',
  variant: 'outlined',
};

export const Filled = Template.bind({});
Filled.args = {
  label: 'Filled',
  variant: 'filled',
};

export const Standard = Template.bind({});
Standard.args = {
  label: 'Standard',
  variant: 'standard',
};

export const NoLabel = Template.bind({});
NoLabel.args = {
  variant: 'outlined',
  hiddenLabel: true,
};

export const Multiline = Template.bind({});
Multiline.args = {
  label: 'Multiline Text Filed',
  multiline: true,
  value: `
  Multiline
  Test

  Example
  `,
  maxRows: 6,
  fullWidth: true,
  variant: 'outlined',
};
