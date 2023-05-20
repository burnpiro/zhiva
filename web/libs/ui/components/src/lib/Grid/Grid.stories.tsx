import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Grid } from './Grid';
import { Paper } from './Paper';
import styled from '@emotion/styled';

export default {
  component: Grid,
  title: 'UI_ELEMENTS/Grid',
  args: {
    spacing: 2,
  },
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'row-reverse', 'column', 'column-reverse'],
    },
    justifyContent: {
      control: 'select',
      options: [
        'flex-start',
        'center',
        'flex-end',
        'space-between',
        'space-around',
        'space-evenly',
      ],
    },
    alignItems: {
      control: 'select',
      options: ['flex-start', 'center', 'flex-end', 'stretch', 'baseline'],
    },
  },
  parameters: {
    layout: 'padded',
  },
} as ComponentMeta<typeof Grid>;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  width: '100%',
  height: '100%',
}));

const Template: ComponentStory<typeof Grid> = (args) => (
  <div style={{ flexGrow: 1 }}>
    <Grid container {...args}>
      <Grid item xs={8}>
        <Item>xs=8</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>xs=4</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>xs=4</Item>
      </Grid>
      <Grid item xs={8}>
        <Item>xs=8</Item>
      </Grid>
    </Grid>
  </div>
);

export const Primary = Template.bind({});
Primary.args = {};

const ResponsiveTemplate: ComponentStory<typeof Grid> = (args) => (
  <div style={{ flexGrow: 1, height: '100vh', minHeight: '100%' }}>
    <Grid container {...args} sx={{ maxHeight: '100%' }}>
      <Grid item xs={6} sm={8}>
        <Item>xs=6 md=8</Item>
      </Grid>
      <Grid item xs={6} sm={4}>
        <Item>xs=6 md=4</Item>
      </Grid>
      <Grid item xs={6} sm={4}>
        <Item>xs=6 md=4</Item>
      </Grid>
      <Grid item xs={6} sm={8}>
        <Item>xs=6 md=8</Item>
      </Grid>
    </Grid>
  </div>
);

export const Responsive = ResponsiveTemplate.bind({});
Responsive.args = {};

const AlignmentTemplate: ComponentStory<typeof Grid> = (args) => (
  <div style={{ flexGrow: 1, height: '100vh', minHeight: '100%' }}>
    <Grid container {...args} sx={{ height: '100vh' }}>
      <Grid item>
        <Item>{'<Grid item>'}</Item>
      </Grid>
      <Grid item>
        <Item>{'<Grid item>'}</Item>
      </Grid>
      <Grid item>
        <Item>{'<Grid item>'}</Item>
      </Grid>
      <Grid item>
        <Item>{'<Grid item>'}</Item>
      </Grid>
    </Grid>
  </div>
);

export const ItemAlignment = AlignmentTemplate.bind({});
ItemAlignment.args = {
  direction: 'row',
  justifyContent: 'center',
  alignItems: 'right',
  rowSpacing: 4,
  columnSpacing: 2,
};
