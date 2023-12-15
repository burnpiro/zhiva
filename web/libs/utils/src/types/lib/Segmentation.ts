import { Types as CSTypes } from '@cornerstonejs/core';

export type BrushColorClass = {
  color: CSTypes.Color;
  name: string;
  classId: string;
  activeLabelmapIndex: number;
  source: 'dcm' | 'model' | 'manual' | 'setting';
  modified: boolean;
};
