import { eventTarget, Enums } from '@cornerstonejs/core';

export type FunctionListener = {
  event: Enums.Events;
  callback: (event: any) => void;
};

export function addInternalCSEvents(methods: FunctionListener[]) {
  for (const method of methods) {
    eventTarget.addEventListener(method.event, method.callback);
  }
}

export function removeInternalCSEvents(methods: FunctionListener[]) {
  for (const method of methods) {
    eventTarget.removeEventListener(method.event, method.callback);
  }
}
