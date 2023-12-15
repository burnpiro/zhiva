import { Types as CSTypes } from '@cornerstonejs/core';

export function parseRGBColorToColorArray(color: string): CSTypes.Color {
  return [
    ...(color
      .replace(/[^\d,]/g, '')
      .split(',')
      .map((el) => Number(el)) as [number, number, number]),
    255,
  ];
}
