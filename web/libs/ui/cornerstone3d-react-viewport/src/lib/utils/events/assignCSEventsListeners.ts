import {
  addInternalCSEvents,
  removeInternalCSEvents,
} from './handleInternalCSEvents';
import { Events } from '@cornerstonejs/core/dist/esm/enums';

export function assignCSEventsListeners(callback: (event: any) => void) {
  return () => {
    addInternalCSEvents([
      {
        event: Events.IMAGE_LOADED,
        callback: callback,
      },
      {
        event: Events.IMAGE_LOAD_ERROR,
        callback: callback,
      },
    ]);

    return () => {
      removeInternalCSEvents([
        {
          event: Events.IMAGE_LOADED,
          callback: callback,
        },
        {
          event: Events.IMAGE_LOAD_ERROR,
          callback: callback,
        },
      ]);
    };
  };
}
