import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Dialog } from './Dialog';
import { useState } from 'react';
import Button from '../Button/Button';
import Typography from '../Typography/Typography';

export default {
  component: Dialog,
  title: 'UI_ELEMENTS/Dialog',
  args: {
    title: 'Sample Dialog',
  },
} as ComponentMeta<typeof Dialog>;

const Template: ComponentStory<typeof Dialog> = (args) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleOpen = () => {
    setShow(true);
  };

  return (
    <>
      <Button onClick={handleOpen}>Show Dialog</Button>
      <Dialog onClose={handleClose} isOpen={show} {...args}>
        <Typography variant={'body2'} sx={{ p: 2 }} textAlign={'justify'}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an
        </Typography>
      </Dialog>
    </>
  );
};

export const Primary = Template.bind({});
Primary.args = {};

export const Submitable = Template.bind({});
Submitable.args = {};
Submitable.argTypes = {
  onSubmit: { action: 'clicked' },
};

export const FullScreen = Template.bind({});
FullScreen.args = {
  fullScreen: true,
};
