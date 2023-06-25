import React, {
  createContext,
  useReducer,
  Dispatch,
  ReactNode,
  useEffect,
} from 'react';
// @ts-ignore
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import { imageLoader } from '@cornerstonejs/core';
import { extractInstanceData } from '@zhiva/utils-cornerstone';
import { SnackbarGenerator } from '@zhiva/services-snackbar';
import {InstanceMetadata} from "@zhiva/utils";

import {
  FileActionTypes,
  FilesActions,
  filesReducer,
  FilesState,
} from './FilesReducer';

const initialState: FilesState = {
  filesToLoad: new Set(),
  loadedFiles: new Map(),
  isLoading: false,
  isError: false,
};

const FilesContext = createContext<{
  state: FilesState;
  dispatch: Dispatch<FilesActions>;
  queueFiles: (files: File[]) => void;
}>({
  state: initialState,
  dispatch: (action: any) => null,
  queueFiles: () => null,
});

const FilesProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(filesReducer, initialState as FilesState);

  useEffect(() => {
    const loadFile = async () => {
      const firstFile = state.filesToLoad.values().next().value;
      const imageId =
        cornerstoneWADOImageLoader.wadouri.fileManager.add(firstFile);
      try {
        const image = await imageLoader.loadImage(imageId);

        dispatch({
          type: FileActionTypes.ADD_LOADED_FILES,
          payload: {
            files: [
              [
                firstFile.name,
                {
                  // @ts-ignore
                  ...extractInstanceData(image.data),
                  imageId: imageId,
                } as any as InstanceMetadata,
              ],
            ] as [string, InstanceMetadata][],
          },
        });
      } catch (e) {
        SnackbarGenerator.error(`Cannot process file: ${firstFile.name}`);
        dispatch({
          type: FileActionTypes.SET_LOADING,
          payload: {
            isLoading: false,
          },
        });
        dispatch({
          type: FileActionTypes.SET_ERROR,
          payload: {
            isError: true,
          },
        });
        console.error(e);
      }
    };

    if (state.filesToLoad.size > 0 && state.isLoading === true) {
      loadFile();
    } else if (state.filesToLoad.size === 0 && state.isLoading === true) {
      dispatch({
        type: FileActionTypes.SET_LOADING,
        payload: { isLoading: false },
      });
    }
  }, [state.filesToLoad, state.isLoading]);

  const queueFiles = (files: File[]) => {
    console.log(files);
    dispatch({ type: FileActionTypes.ADD_FILES_TO_LOAD, payload: { files } });
    dispatch({
      type: FileActionTypes.SET_LOADING,
      payload: { isLoading: true },
    });
  };

  return (
    <FilesContext.Provider value={{ state, dispatch, queueFiles }}>
      {children}
    </FilesContext.Provider>
  );
};

export { FilesProvider, FilesContext };
