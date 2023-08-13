import {
  InstanceMetadataObj,
  InstanceUIDs,
  SeriesObj,
  StudyObj,
} from './Dicom';

export type InstanceElement = InstanceMetadataObj & {
  imageId: string;
};

export type InstancesList = Map<
  InstanceUIDs['SOPInstanceUID'],
  InstanceElement
>;

export type SeriesElement = SeriesObj & {
  instances: InstancesList;
  imageIds: string[];
};

export type SeriesList = Map<InstanceUIDs['SeriesInstanceUID'], SeriesElement>;

export type StudyElement = StudyObj & {
  series: SeriesList;
};

export type StudiesList = Map<InstanceUIDs['StudyInstanceUID'], StudyElement>;
