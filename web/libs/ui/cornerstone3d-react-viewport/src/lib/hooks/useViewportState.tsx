import { Dispatch, useReducer } from 'react';
import { ActionMap } from '@zhiva/types';

export enum ViewportActionTypes {
  SET_STATE = 'SET_STATE',
}

type State = {
  isLoading: boolean;
  isPlaying: boolean;
  scale: number;
  windowCenter: number;
  windowWidth: number;
  rotationDegrees: number;
  isFlippedVertically: boolean;
  isFlippedHorizontally: boolean;
  imagesProcessed: number;
  error: Error | null;
  imageId?: string;
  imageIdIndex: number;
};

const defaultState: State = {
  isLoading: false,
  isPlaying: false,
  scale: 0,
  windowCenter: 0,
  windowWidth: 0,
  rotationDegrees: 0,
  isFlippedVertically: false,
  isFlippedHorizontally: false,
  imagesProcessed: 0,
  error: null,
  imageId: undefined,
  imageIdIndex: 0,
};

type Payload = {
  [ViewportActionTypes.SET_STATE]: Partial<State>;
};

export type ViewportActions = ActionMap<Payload>[keyof ActionMap<Payload>];

const viewportReducer = (state: State, action: ViewportActions) => {
  switch (action.type) {
    case ViewportActionTypes.SET_STATE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      throw new Error();
  }
};

export function useViewportState() {
  const [state, dispatch] = useReducer(viewportReducer, defaultState);

  return { state, dispatch };
}
