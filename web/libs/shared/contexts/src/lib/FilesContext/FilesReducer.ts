import { ActionMap, InstanceUIDs } from '@zhiva/types';

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

export enum FileActionTypes {
  SET_FILES_TO_LOAD = 'SET_FILES_TO_LOAD',
  ADD_FILES_TO_LOAD = 'ADD_FILES_TO_LOAD',
  REMOVE_FILES_TO_LOAD = 'REMOVE_FILES_TO_LOAD',
  ADD_LOADED_FILES = 'ADD_LOADED_FILES',
  REMOVE_LOADED_FILES = 'REMOVE_LOADED_FILES',
  SET_LOADING = 'SET_LOADING',
  SET_ERROR = 'SET_ERROR',
}

export type FilesState = {
  filesToLoad: Set<File>;
  loadedFiles: Map<string, InstanceMetadata>;
  isLoading: boolean;
  isError: boolean;
};

type FilesPayload = {
  [FileActionTypes.SET_FILES_TO_LOAD]: {
    files: File[];
  };
  [FileActionTypes.ADD_FILES_TO_LOAD]: {
    files: File[];
  };
  [FileActionTypes.REMOVE_FILES_TO_LOAD]: {
    files: string[];
  };
  [FileActionTypes.ADD_LOADED_FILES]: {
    files: [string, InstanceMetadata][];
  };
  [FileActionTypes.REMOVE_LOADED_FILES]: {
    files: string[];
  };
  [FileActionTypes.SET_LOADING]: {
    isLoading: boolean;
  };
  [FileActionTypes.SET_ERROR]: {
    isError: boolean;
  };
};

export type FilesActions =
  ActionMap<FilesPayload>[keyof ActionMap<FilesPayload>];

export const filesReducer = (state: FilesState, action: FilesActions) => {
  switch (action.type) {
    case FileActionTypes.SET_FILES_TO_LOAD:
      return {
        ...state,
        filesToLoad: new Set<File>([...action.payload.files]),
      };
    case FileActionTypes.ADD_FILES_TO_LOAD:
      if (state.filesToLoad.size > 0) {
        return {
          ...state,
          filesToLoad: new Set<File>([
            ...Array.from(state.filesToLoad),
            ...action.payload.files,
          ]),
        };
      }
      return {
        ...state,
        filesToLoad: new Set<File>([...action.payload.files]),
      };
    case FileActionTypes.REMOVE_FILES_TO_LOAD:
      return {
        ...state,
        filesToLoad: new Set<File>(
          Array.from(state.filesToLoad).filter(
            (el) => !action.payload.files.includes(el.name)
          )
        ),
      };
    case FileActionTypes.ADD_LOADED_FILES:
      if (state.loadedFiles.size > 0) {
        return {
          ...state,
          loadedFiles: new Map([
            ...Array.from(state.loadedFiles),
            ...action.payload.files,
          ]),
          filesToLoad: new Set<File>(
            Array.from(state.filesToLoad).filter(
              (el) => !action.payload.files.map((el) => el[0]).includes(el.name)
            )
          ),
        };
      }
      return {
        ...state,
        loadedFiles: new Map([...action.payload.files]),
        filesToLoad: new Set<File>(
          Array.from(state.filesToLoad).filter(
            (el) => !action.payload.files.map((el) => el[0]).includes(el.name)
          )
        ),
      };
    case FileActionTypes.REMOVE_LOADED_FILES:
      return {
        ...state,
        loadedFiles: new Map(
          Array.from(state.loadedFiles).filter(
            (el) => !action.payload.files.includes(el[0])
          )
        ),
      };
    case FileActionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    case FileActionTypes.SET_ERROR:
      return {
        ...state,
        isError: action.payload.isError,
      };
    default:
      return state;
  }
};
