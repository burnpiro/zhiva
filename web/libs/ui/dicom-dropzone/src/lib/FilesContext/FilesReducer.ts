import { InstanceUIDs, Modality } from '@zhiva/types';

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum FileActionTypes {
  SET_FILES_TO_LOAD = 'SET_FILES_TO_LOAD',
  ADD_FILES_TO_LOAD = 'ADD_FILES_TO_LOAD',
  REMOVE_FILES_TO_LOAD = 'REMOVE_FILES_TO_LOAD',
  ADD_LOADED_FILES = 'ADD_LOADED_FILES',
  REMOVE_LOADED_FILES = 'REMOVE_LOADED_FILES',
  SET_LOADING = 'SET_LOADING',
}

export type InstanceMetadata = InstanceUIDs & {
  seriesNumber: number;
  modality: Modality;
  sliceLocation: number;
  seriesDescription: string;
  studyDescription: string;
  imageId: string;
};

export type FilesState = {
  filesToLoad: Set<File>;
  loadedFiles: Map<string, InstanceMetadata>;
  isLoading: boolean;
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
};

export type FilesActions =
  ActionMap<FilesPayload>[keyof ActionMap<FilesPayload>];

export const filesReducer = (state: FilesState, action: FilesActions) => {
  console.log(action);
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
    default:
      return state;
  }
};
