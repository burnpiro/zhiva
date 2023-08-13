import { Types as CSToolTypes } from '@cornerstonejs/tools';

export type BrushColorClass = {
  color: CSToolTypes.Color;
  name: string;
  classId: string;
  activeLabelmapIndex: number;
  source: 'dcm' | 'model' | 'manual' | 'setting';
  modified: boolean;
};
