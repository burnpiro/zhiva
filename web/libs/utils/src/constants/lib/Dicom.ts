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

export enum PREGNANCY_STATUS {
  NOT_PREGNANT=1,
  POSSIBLY_PREGNANT,
  DEFINITELY_PREGNANT,
  UNKNOWN
}

export enum COMMON_DICOM_CODES {
  STUDY_INSTANCE_UID = '0020000D',
  STUDY_ID = '00200010',
  STUDY_DATE = '00080020',
  STUDY_TIME = '00080030',
  STUDY_DESCRIPTION = '00081030',
  SERIES_INSTANCE_UID = '0020000E',
  SERIES_DATE = '00080021',
  SERIES_TIME = '00080031',
  SERIES_NUMBER = '00200011',
  SERIES_DESCRIPTION = '0008103E',
  ACCESSION_NUMBER = '00080050',
  REFERRING_PHYSICIAN_NAME = '00080090',
  PATIENT_NAME = '00100010',
  PATIENT_ID = '00100020',
  PATIENT_BIRTH_DATE = '00100030',
  PATIENT_AGE = '00101010',
  PATIENT_SEX = '00100040',
  PATIENT_SIZE = '00101020',
  PATIENT_WEIGHT = '00101030',
  ADDITIONAL_PATIENT_HISTORY = '001021B0',
  PATIENT_IDENTITY_REMOVED = '00120062',
  DEIDENTIFICATION_METHOD = '00120063',
  DEIDENTIFICATION_METHOD_CODE_SEQUENCE = '00120064',
  NUMBER_OF_STUDY_RELATED_SERIES = '00201206',
  NUMBER_OF_STUDY_RELATED_INSTANCES = '00201208',
  NUMBER_OF_SERIES_RELATED_INSTANCES = '00201209',
  MODALITY = '00080060',
  MODALITIES_IN_STUDY = '00080061',
  INSTITUTION_NAME = '00080080',
  FRAME_OR_REFERENCE_UID = '00200052',
  PERFORMED_PROCEDURE_STEP_START_DATE = '00400244',
  PERFORMED_PROCEDURE_STEP_START_TIME = '00400245',
  SOP_CLASS_UID = '00080016',
  SOP_INSTANCE_UID = '00080018',
  PIXEL_DATA = '7FE00010',
  SPECIFIC_CHARACTER_SET = '00080005',
  IMAGE_TYPE = '00080008',
  INSTANCE_NUMBER = '00200013',
  INSTANCE_CREATE_DATE = '00080012',
  INSTANCE_CREATE_TIME = '00080013',
  ACQUISITION_DATE = '00080022',
  ACQUISITION_TIME = '00080032',
  CONTENT_DATE = '00080023',
  CONTENT_TIME = '00080033',
  MANUFACTURER = '00080070',
  MANUFACTURER_MODEL_NAME = '00081090',
  PROTOCOL_NAME = '00181030',
  NUMBER_OF_FRAMES = '00280008',
  REFERENCED_SERIES_SEQUENCE = '00081115',
  REFERENCED_SERIES_INSTANCE_UID = '0020000e',
  REFERENCED_INSTANCE_SEQUENCE = '0008114a',
  REFERENCED_SOP_INSTANCE_UID = '00081155',
  SEGMENT_SEQUENCE = '00620002',
  SEGMENT_NUMBER = '00620004',
  SEGMENT_LABEL = '00620005',
  SEGMENT_DESCRIPTION = '00620006',
  SEGMENT_ALGORITHM_TYPE = '00620008',
  CIELAB_VALUE = '0062000D',
  CONTENT_CREATOR_NAME = '00700084',
  ROWS = '00280010',
  COLUMNS = '00280011',
  PER_FRAME_FUNCTIONAL_GROUPS_SEQUENCE = '52009230',
  DERIVATION_IMAGE_SEQUENCE = '00089124',
  SOURCE_IMAGE_SEQUENCE = '00082112',
  FRAME_CONTENT_SEQUENCE = '00209111',
  DIMENSION_INDEX_VALUES = '00209157',
  SEGMENTATION_IDENTIFICATION_SEQUENCE = '0062000A',
  REFERENCED_SEGMENT_NUMBER = '0062000B'
}

export const MODALITIES: { [modality in Modality]: string } = {
  CR: 'Computed Radiography',
  CT: 'Computed Tomography',
  MR: 'Magnetic Resonance',
  US: 'Ultrasound',
  OT: 'Other',
  BI: 'Biomagnetic imaging',
  CD: 'Color flow Doppler',
  DD: 'Duplex Doppler',
  DG: 'Diaphanography',
  ES: 'Endoscopy',
  LS: 'Laser surface scan',
  PT: 'Positron emission tomography (PET)',
  RG: 'Radiographic imaging (conventional film/screen)',
  ST: 'Single-photon emission computed tomography (SPECT)',
  TG: 'Thermography',
  XA: 'X-Ray Angiography',
  RF: 'Radio Fluoroscopy',
  RTIMAGE: 'Radiotherapy Image',
  RTDOSE: 'Radiotherapy Dose',
  RTSTRUCT: 'Radiotherapy Structure Set',
  RTPLAN: 'Radiotherapy Plan',
  RTRECORD: 'RT Treatment Record',
  HC: 'Hard Copy',
  DX: 'Digital Radiography',
  NM: 'Nuclear Medicine',
  MG: 'Mammography',
  IO: 'Intra-oral Radiography',
  PX: 'Panoramic X-Ray',
  GM: 'General Microscopy',
  SM: 'Slide Microscopy',
  XC: 'External-camera Photography',
  PR: 'Presentation State',
  AU: 'Audio ECG',
  EPS: 'Cardiac Electrophysiology',
  HD: 'Hemodynamic Waveform',
  SR: 'SR Document',
  IVUS: 'Intravascular Ultrasound',
  OP: 'Ophthalmic Photography',
  SMR: 'Stereometric Relationship',
  SEG: 'Segmentation',
  DS: 'Digital Subtraction Angiography', // RETIRED
  CF: 'Cinefluorography', // RETIRED
  DF: 'Digital fluoroscopy', // RETIRED
  VF: 'Videofluorography', // RETIRED
  AS: 'Angioscopy', // RETIRED
  CS: 'Cystoscopy', // RETIRED
  EC: 'Echocardiography', // RETIRED
  LP: 'Laparoscopy', // RETIRED
  FA: 'Fluorescein angiography', // RETIRED
  CP: 'Culposcopy', // RETIRED
  DM: 'Digital microscopy', // RETIRED
  FS: 'Fundoscopy', // RETIRED
  MA: 'Magnetic resonance angiography', // RETIRED
  MS: 'Magnetic resonance spectroscopy', // RETIRED
};
