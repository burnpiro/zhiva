import { Enums, utilities } from '@cornerstonejs/tools';
import { Events } from '@cornerstonejs/core/dist/esm/enums';

export type FunctionListener = {
  event: Enums.Events | utilities.cine.Events | Events;
  callback: (event: any) => void;
};

export function addElementCSEvents(
  methods: FunctionListener[],
  element: HTMLDivElement
) {
  for (const method of methods) {
    element.addEventListener(method.event, method.callback);
  }
}

export function removeElementCSEvents(
  methods: FunctionListener[],
  element: HTMLDivElement
) {
  for (const method of methods) {
    element.removeEventListener(method.event, method.callback);
  }
}
