import React, {
  createContext,
  useReducer,
  Dispatch,
  ReactNode,
  useEffect,
} from 'react';
// @ts-ignore
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import { loadImage } from '@cornerstonejs/core/dist/esm/imageLoader';
import { extractInstanceData } from '@zhiva/utils-cornerstone';

import {
  FileActionTypes,
  FilesActions,
  filesReducer,
  FilesState,
  InstanceMetadata,
} from './FilesReducer';

type InitialStateType = {
  filesToLoad: Set<File>;
  loadedFiles: Map<string, InstanceMetadata>;
  isLoading: boolean;
};

const initialState: FilesState = {
  filesToLoad: new Set(),
  loadedFiles: new Map(),
  isLoading: false,
};

const FilesContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<FilesActions>;
  queueFiles: (files: File[]) => void;
}>({
  state: initialState,
  dispatch: () => null,
  queueFiles: () => null,
});

const FilesProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(filesReducer, initialState);

  useEffect(() => {
    const loadFile = async () => {
      const firstFile = state.filesToLoad.values().next().value;
      const imageId =
        cornerstoneWADOImageLoader.wadouri.fileManager.add(firstFile);
      try {
        const image = await loadImage(imageId);

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
