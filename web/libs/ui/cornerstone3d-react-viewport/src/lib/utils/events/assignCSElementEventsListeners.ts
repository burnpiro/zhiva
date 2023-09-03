import {
  addElementCSEvents,
  removeElementCSEvents,
} from '@zhiva/utils-cornerstone';
import { utilities } from '@cornerstonejs/tools';
import { Enums as CSEnums } from '@cornerstonejs/core';

export function assignCSElementEventsListeners(
  callback: (event: any) => void,
  element: HTMLDivElement | null
) {
  return () => {
    if (element) {
      addElementCSEvents(
        [
          {
            event: utilities.cine.Events.CLIP_STARTED,
            callback: callback,
          },
          {
            event: utilities.cine.Events.CLIP_STOPPED,
            callback: callback,
          },
          {
            event: CSEnums.Events.IMAGE_RENDERED,
            callback: callback,
          },
          {
            event: CSEnums.Events.CAMERA_MODIFIED,
            callback: callback,
          },
          {
            event: CSEnums.Events.VOI_MODIFIED,
            callback: callback,
          },
          {
            event: CSEnums.Events.STACK_NEW_IMAGE,
            callback: callback,
          },
        ],
        element
      );
    }

    return () => {
      if (element) {
        removeElementCSEvents(
          [
            {
              event: utilities.cine.Events.CLIP_STARTED,
              callback: callback,
            },
            {
              event: utilities.cine.Events.CLIP_STOPPED,
              callback: callback,
            },
            {
              event: CSEnums.Events.IMAGE_RENDERED,
              callback: callback,
            },
            {
              event: CSEnums.Events.CAMERA_MODIFIED,
              callback: callback,
            },
            {
              event: CSEnums.Events.VOI_MODIFIED,
              callback: callback,
            },
            {
              event: CSEnums.Events.STACK_NEW_IMAGE,
              callback: callback,
            },
          ],
          element
        );
      }
    };
  };
}
