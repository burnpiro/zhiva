import { ComponentStory, ComponentMeta } from '@storybook/react';
import { UiDicomDropzone } from './UiDicomDropzone';
import { FilesProvider } from './FilesContext/FilesContext';

export default {
  component: UiDicomDropzone,
  title: 'UTILS/DicomDropzone',
} as ComponentMeta<typeof UiDicomDropzone>;

const Template: ComponentStory<typeof UiDicomDropzone> = (args) => (
  <FilesProvider>
    <UiDicomDropzone {...args} />
  </FilesProvider>
);

export const Primary = Template.bind({});
Primary.args = {};
