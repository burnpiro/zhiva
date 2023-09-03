import { Enums as CSEnums } from '@cornerstonejs/core';
import {addInternalCSEvents, removeInternalCSEvents} from "@zhiva/utils-cornerstone";

export function assignCSEventsListeners(callback: (event: any) => void) {
  return () => {
    addInternalCSEvents([
      {
        event: CSEnums.Events.IMAGE_LOADED,
        callback: callback,
      },
      {
        event: CSEnums.Events.IMAGE_LOAD_ERROR,
        callback: callback,
      },
    ]);

    return () => {
      removeInternalCSEvents([
        {
          event: CSEnums.Events.IMAGE_LOADED,
          callback: callback,
        },
        {
          event: CSEnums.Events.IMAGE_LOAD_ERROR,
          callback: callback,
        },
      ]);
    };
  };
}
