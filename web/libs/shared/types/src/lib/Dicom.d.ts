export type Modality =
  | 'CR'
  | 'CT'
  | 'MR'
  | 'US'
  | 'OT'
  | 'BI'
  | 'CD'
  | 'DD'
  | 'DG'
  | 'ES'
  | 'LS'
  | 'PT'
  | 'RG'
  | 'ST'
  | 'TG'
  | 'XA'
  | 'RF'
  | 'RTIMAGE'
  | 'RTDOSE'
  | 'RTSTRUCT'
  | 'RTPLAN'
  | 'RTRECORD'
  | 'HC'
  | 'DX'
  | 'NM'
  | 'MG'
  | 'IO'
  | 'PX'
  | 'GM'
  | 'SM'
  | 'XC'
  | 'PR'
  | 'AU'
  | 'EPS'
  | 'HD'
  | 'SR'
  | 'IVUS'
  | 'OP'
  | 'SMR'
  | 'DS'
  | 'CF'
  | 'DF'
  | 'VF'
  | 'AS'
  | 'CS'
  | 'EC'
  | 'LP'
  | 'FA'
  | 'CP'
  | 'DM'
  | 'FS'
  | 'MA'
  | 'MS'
  | 'SEG'; // http://dicomlookup.com/modalities.asp

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
  StudyInstanceUID: StudyInstance['StudyInstanceUID'];
  SeriesInstanceUID: SeriesObj['SeriesInstanceUID'];
  SOPInstanceUID: InstanceMetadataObj['SOPInstanceUID'];
};

export type OptionalInstanceUIDs = {
  StudyInstanceUID: InstanceUIDs['StudyInstanceUID'];
  SeriesInstanceUID?: InstanceUIDs['SeriesInstanceUID'];
  SOPInstanceUID?: InstanceUIDs['SOPInstanceUID'];
};
