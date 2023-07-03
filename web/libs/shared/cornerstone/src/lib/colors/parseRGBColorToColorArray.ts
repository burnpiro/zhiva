import { Types as CSToolsTypes } from '@cornerstonejs/tools';

export function parseRGBColorToColorArray(color: string): CSToolsTypes.Color {
  return [
    ...(color
      .replace(/[^\d,]/g, '')
      .split(',')
      .map((el) => Number(el)) as [number, number, number]),
    255,
  ];
}
