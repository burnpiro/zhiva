import {
  InstanceMetadataObj,
  InstanceUIDs,
  SeriesObj,
  StudyObj,
} from './Dicom';

export type InstancesList = Map<
  InstanceUIDs['SOPInstanceUID'],
  InstanceMetadataObj & {
    imageId: string;
  }
>;

export type SeriesList = Map<
  InstanceUIDs['SeriesInstanceUID'],
  SeriesObj & {
    instances: InstancesList;
  }
>;

export type StudiesList = Map<
  InstanceUIDs['StudyInstanceUID'],
  StudyObj & {
    series: SeriesList;
  }
>;
