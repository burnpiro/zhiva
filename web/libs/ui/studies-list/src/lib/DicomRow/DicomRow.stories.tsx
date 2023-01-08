import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DicomRow } from './DicomRow';

import { studyList } from '../../data/exampleStudyList';
import { DataFileDef } from '../columnFilter';

const columns: DataFileDef[] = [
  {
    key: 'StudyDate',
    header: 'Date',
    type: 'date',
  },
  {
    key: 'PatientName',
    header: 'Patient',
    type: 'text',
    displayOnMobile: false,
  },
  {
    key: 'Modalities',
    header: 'Modality',
    type: 'modality',
  },
];

const descriptionColumns: DataFileDef[] = [
  {
    key: 'PatientName',
    header: 'Patient',
    type: 'text',
    displayOnDesktop: false,
  },
  {
    key: 'StudyDescription',
    header: 'Description',
    type: 'text',
  },
];

export default {
  component: DicomRow,
  title: 'Studies_List/DicomRow',
  args: {
    columns,
    descriptionColumns,
  },
  argTypes: { onStudyOpen: { action: 'clicked' } },
} as ComponentMeta<typeof DicomRow>;

const Template: ComponentStory<typeof DicomRow> = (args) => (
  <table>
    <tbody>
      <DicomRow {...args} row={studyList.values().next().value} />
    </tbody>
  </table>
);

export const Primary = Template.bind({});
Primary.args = {};
