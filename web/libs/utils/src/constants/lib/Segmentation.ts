import { Types as CSToolTypes } from '@cornerstonejs/tools';

export enum ColorClassSources {
  DMC = 'dcm',
  MODEL = 'model',
  MANUAL = 'manual',
  SETTING = 'setting',
}

export const DEFAULT_COLOR: CSToolTypes.Color = [221, 84, 84, 255];
