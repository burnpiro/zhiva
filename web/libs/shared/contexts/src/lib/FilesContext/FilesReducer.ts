import {ActionMap, InstanceMetadata} from '@zhiva/utils';


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

export const filesReducer = (state: FilesState, action: FilesActions): FilesState => {
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
            (el: File) => !action.payload.files.includes(el.name)
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
              (el: File) => !action.payload.files.map((el: [string, InstanceMetadata]) => el[0]).includes(el.name)
            )
          ),
        };
      }
      return {
        ...state,
        loadedFiles: new Map([...action.payload.files]),
        filesToLoad: new Set<File>(
          Array.from(state.filesToLoad).filter(
            (el: File) => !action.payload.files.map((el: [string, InstanceMetadata]) => el[0]).includes(el.name)
          )
        ),
      };
    case FileActionTypes.REMOVE_LOADED_FILES:
      return {
        ...state,
        loadedFiles: new Map(
          Array.from(state.loadedFiles).filter(
            (el: [string, InstanceMetadata]) => !action.payload.files.includes(el[0])
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
