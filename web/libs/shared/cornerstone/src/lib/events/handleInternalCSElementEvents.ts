import { Enums, utilities } from '@cornerstonejs/tools';
import { Enums as CSEnums } from '@cornerstonejs/core';

type FunctionListener = {
  event: Enums.Events | utilities.cine.Events | CSEnums.Events;
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
