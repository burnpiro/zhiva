import {
  addElementCSEvents,
  removeElementCSEvents,
} from './handleInternalCSElementEvents';
import { Enums, utilities } from '@cornerstonejs/tools';
import {Events} from "@cornerstonejs/core/dist/esm/enums";

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
            event: Events.IMAGE_RENDERED,
            callback: callback,
          },
          {
            event: Events.CAMERA_MODIFIED,
            callback: callback,
          },
          {
            event: Events.VOI_MODIFIED,
            callback: callback,
          },
          {
            event: Events.STACK_NEW_IMAGE,
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
              event: Events.IMAGE_RENDERED,
              callback: callback,
            },
            {
              event: Events.CAMERA_MODIFIED,
              callback: callback,
            },
            {
              event: Events.VOI_MODIFIED,
              callback: callback,
            },
            {
              event: Events.STACK_NEW_IMAGE,
              callback: callback,
            },
          ],
          element
        );
      }
    };
  };
}
