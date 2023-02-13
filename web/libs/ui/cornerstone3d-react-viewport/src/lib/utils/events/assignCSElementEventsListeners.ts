import {
  addElementCSEvents,
  removeElementCSEvents,
} from './handleInternalCSElementEvents';
import { Enums, utilities } from '@cornerstonejs/tools';

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
          ],
          element
        );
      }
    };
  };
}
