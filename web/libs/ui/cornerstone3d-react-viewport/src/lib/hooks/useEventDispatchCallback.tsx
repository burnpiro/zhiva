import { Dispatch, useCallback } from 'react';
import { Enums, utilities } from '@cornerstonejs/core';
import {
  Enums as ToolEnums,
  utilities as ToolUtilities,
} from '@cornerstonejs/tools';
import { ViewportActions, ViewportActionTypes } from './useViewportState';
import { Cornerstone3dReactViewportProps } from '../Cornerstone3dReactViewportProps';

export function useCSEventDispatchCallback(
  dispatch: Dispatch<ViewportActions>,
  onHandlers: Partial<Cornerstone3dReactViewportProps>
) {
  const handleEventCallbacks = useCallback(
    (event: { type: Enums.Events; detail: any }) => {
      console.log(event.type, event.detail);
      switch (event.type) {
        case Enums.Events.IMAGE_LOADED:
          if (onHandlers.onImageLoaded) {
            onHandlers.onImageLoaded(event.detail.image.imageId);
          }
          dispatch({
            type: ViewportActionTypes.SET_STATE,
            payload: {
              isLoading: false,
            },
          });
          break;
        case Enums.Events.IMAGE_LOAD_ERROR:
          dispatch({
            type: ViewportActionTypes.SET_STATE,
            payload: {
              isLoading: false,
              error: new Error('Image Loading Failed'),
            },
          });
          break;
      }
    },
    [dispatch]
  );

  return handleEventCallbacks;
}

export function useCSElementEventDispatchCallback(
  dispatch: Dispatch<any>,
  onHandlers: Partial<Cornerstone3dReactViewportProps>
) {
  const handleEventCallbacks = useCallback(
    (event: {
      type: ToolEnums.Events | ToolUtilities.cine.Events | Enums.Events;
      detail: any;
    }) => {
      console.log(event.type, event.detail);
      switch (event.type) {
        case ToolUtilities.cine.Events.CLIP_STARTED:
          dispatch({
            type: ViewportActionTypes.SET_STATE,
            payload: {
              isPlaying: true,
            },
          });
          break;
        case ToolUtilities.cine.Events.CLIP_STOPPED:
          dispatch({
            type: ViewportActionTypes.SET_STATE,
            payload: {
              isPlaying: false,
            },
          });
          break;
        case Enums.Events.IMAGE_RENDERED:
          dispatch({
            type: ViewportActionTypes.SET_STATE,
            payload: {
              isLoading: false,
            },
          });
          break;
        case Enums.Events.CAMERA_MODIFIED:
          dispatch({
            type: ViewportActionTypes.SET_STATE,
            payload: {
              scale: event.detail.camera.scale,
              // windowCenter: viewport.voi.windowCenter,
              // windowWidth: viewport.voi.windowWidth,
              // rotationDegrees: viewport.rotation,
              isFlippedVertically: event.detail.camera.flipHorizontal,
              isFlippedHorizontally: event.detail.camera.flipVertical,
            },
          });
          break;
        case Enums.Events.VOI_MODIFIED:
          const windowLevels = utilities.windowLevel.toWindowLevel(
            event.detail.range.lower,
            event.detail.range.upper
          );
          dispatch({
            type: ViewportActionTypes.SET_STATE,
            payload: {
              windowCenter: windowLevels.windowCenter,
              windowWidth: windowLevels.windowWidth,
            },
          });
          break;
        case Enums.Events.STACK_NEW_IMAGE:
          dispatch({
            type: ViewportActionTypes.SET_STATE,
            payload: {
              imageId: event.detail.imageId,
              imageIdIndex: event.detail.imageIdIndex,
            },
          });
          break;
      }
    },
    [dispatch]
  );

  return handleEventCallbacks;
}
