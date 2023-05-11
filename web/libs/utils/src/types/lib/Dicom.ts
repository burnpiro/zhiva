import {Modality, PREGNANCY_STATUS} from "@zhiva/utils";

export type StudyObj = {
  id: string;
  StudyInstanceUID: string;
  StudyDate: string;
  StudyTime: string;
  AccessionNumber: string;
  ReferringPhysicianName: string;
  PatientName: string;
  PatientID: string;
  PatientBirthdate: string;
  PatientSex: string;
  StudyId: string;
  StudyDescription: string;
  NumberOfStudyRelatedSeries: string;
  NumberOfStudyRelatedInstances: string;
  Modalities: Modality | Modality[];
  // [dicomKey: string]: number | string | string[];
};

export type SeriesObj = {
  id: string;
  SeriesNumber: number;
  StudyInstanceUID: string;
  SeriesInstanceUID: string;
  PerformedProcedureStepStartDate: string;
  PerformedProcedureStepStartTime: string;
  NumberOfSeriesRelatedInstances: number;
  SeriesDescription: string;
  Modalities: Modality | Modality[];
  isLowPriority?: boolean;
  // [dicomKey: string]: number | string | string[];
};

export type SegmentationObj = {
  id: string;
  SeriesNumber: number;
  StudyInstanceUID: string;
  SeriesInstanceUID: string;
  SOPInstanceUID: string;
  PerformedProcedureStepStartDate: string;
  PerformedProcedureStepStartTime: string;
  NumberOfSeriesRelatedInstances: number;
  SeriesDescription: string;
  Modalities: Modality | Modality[];
  isLowPriority?: boolean;
  rows: number;
  NumberOfFrames: number;
  columns: number;
  ReferencedSeriesSequence: {
    SeriesInstanceUID: string;
  }[];
  SegmentSequence: {
    SegmentNumber: number;
    SegmentLabel: string;
    SegmentDescription: string;
    SegmentAlgorithmType: string;
    CIELabValue: string;
  }[];
  PerFrameFunctionalGroupsSequence: {
    DerivationImageSequence: {
      SourceImageSequence: {
        ReferencedSOPInstanceUID: string;
      }[];
    }[];
    FrameContentSequence: {
      DimensionIndexValues: string;
    }[];
    SegmentIdentificationSequence: {
      ReferencedSegmentNumber: string;
    }[];
  }[];
  ContentCreatorName?: string;
  // [dicomKey: string]: number | string | string[];
};

export type InstanceMetadataObj = SeriesObj & {
  StudyDate: string;
  StudyTime: string;
  SeriesDate: string;
  SeriesTime: string;
  AdditionalPatientHistory: string;
  FrameOfReferenceUID: string;
  SOPClassUID: string;
  SOPInstanceUID: string;
  InstanceNumber: number;
  SpecificCharacterSet?: string;
  InstanceCreationDate?: string;
  InstanceCreationTime?: string;
  AcquisitionDate?: string;
  ContentDate?: string;
  AcquisitionTime?: string;
  ContentTime?: string;
  AccessionNumber?: string;
  Manufacturer?: string;
  ReferringPhysicianName?: string;
  StudyDescription?: string;
  SeriesDescription?: string;
  ManufacturerModelName?: string;
  PatientName?: {
    Alphabetic: string;
  }[];
  PatientID?: string;
  PatientBirthDate?: string;
  PatientSex?: string;
  PatientAge?: string;
  PatientSize?: number;
  PatientWeight?: number;
  PregnancyStatus?: PREGNANCY_STATUS,
  PatientComments?: string,
  PatientIdentityRemoved?: string,
  DeidentificationMethod?: string,
  NumOfImages?: number;
  Columns?: number;
  Rows?: number;
  AcquisitionNumber?: number;
  PhotometricInterpretation?: string;
  BitsAllocated?: number;
  BitsStored?: number;
};

export type InstanceUIDs = {
  StudyInstanceUID: SeriesObj['StudyInstanceUID'];
  SeriesInstanceUID: SeriesObj['SeriesInstanceUID'];
  SOPInstanceUID: InstanceMetadataObj['SOPInstanceUID'];
};

export type OptionalInstanceUIDs = {
  StudyInstanceUID: InstanceUIDs['StudyInstanceUID'];
  SeriesInstanceUID?: InstanceUIDs['SeriesInstanceUID'];
  SOPInstanceUID?: InstanceUIDs['SOPInstanceUID'];
};

export type InstanceMetadata = InstanceUIDs & {
  AccessionNumber: string;
  AcquisitionDate: string;
  AcquisitionNumber: string;
  AngioFlag: string;
  BitsAllocated: string;
  BitsStored: string;
  BodyPartExamined: string;
  Columns: string;
  ContentDate: string;
  FrameOfReferenceUID: string;
  HighBit: string;
  ImageOrientationPatient: string;
  ImagePositionPatient: string;
  ImageType: string;
  InstanceCreationDate: string;
  InstanceCreationTime: string;
  InstanceNumber: string;
  InstitutionAddress: string;
  InstitutionName: string;
  InstitutionalDepartmentName: string;
  LargestImagePixelValue: string;
  MRAcquisitionType: string;
  Manufacturer: string;
  ManufacturerModelName: string;
  Modality: string;
  PatientAge: string;
  PatientSize: string;
  PatientWeight: string;
  PixelRepresentation: string;
  PixelSpacing: string;
  ReferringPhysicianName: string;
  Rows: string;
  SOPClassUID: string;
  SOPInstanceUID: string;
  ScanningSequence: string;
  SequenceName: string;
  SequenceVariant: string;
  SeriesDate: string;
  SeriesDescription: string;
  SeriesInstanceUID: string;
  SeriesNumber: string;
  SliceThickness: string;
  SmallestImagePixelValue: string;
  SpecificCharacterSet: string;
  StudyDate: string;
  StudyDescription: string;
  StudyID: string;
  StudyInstanceUID: string;
  TimezoneOffsetFromUTC: string;
  WindowCenter: string;
  WindowWidth: string;
  imageId: string;
};
