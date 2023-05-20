import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Paper } from './Paper';
import styled from '@emotion/styled';

export default {
  component: Paper,
  title: 'UI_ELEMENTS/Paper',
  args: {
    children: 'Paper content',
    sx: {
      p: 2,
    },
    elevation: 6,
  },
} as ComponentMeta<typeof Paper>;

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Template: ComponentStory<typeof Paper> = (args) => <Paper {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

export const Outlined = Template.bind({});
Outlined.args = {
  variant: 'outlined',
};

const StyledPaperTemplate: ComponentStory<typeof Paper> = (args) => (
  <StyledPaper {...args} />
);

export const Styled = StyledPaperTemplate.bind({});
Styled.args = {
  variant: 'outlined',
};
Styled.parameters = {
  docs: {
    source: {
      code: `
import { Paper } from '@zhiva/ui-components';
import styled from "@emotion/styled";

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

<StyledPaper
  {...args}
>
  Paper content
</StyledPaper>
        `,
    },
  },
};
