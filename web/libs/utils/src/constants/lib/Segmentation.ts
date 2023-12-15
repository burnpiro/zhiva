import { Types as CSTypes } from '@cornerstonejs/core';

export enum ColorClassSources {
  DMC = 'dcm',
  MODEL = 'model',
  MANUAL = 'manual',
  SETTING = 'setting',
}

export const DEFAULT_COLOR: CSTypes.Color = [221, 84, 84, 255];
