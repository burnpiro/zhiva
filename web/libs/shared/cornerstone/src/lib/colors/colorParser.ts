export const matchColors =
  /rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;

type Color = { r: number; g: number; b: number };

export const defaultColor: Color = { r: 100, g: 100, b: 200 };

export function parseStringToRGB(color: string): Color {
  const parsedColor = matchColors.exec(color);

  return {
    r: parsedColor ? Number(parsedColor[0]) : defaultColor.r,
    g: parsedColor ? Number(parsedColor[1]) : defaultColor.g,
    b: parsedColor ? Number(parsedColor[2]) : defaultColor.b,
  };
}

export function parseCSColorToRGB(color: [number, number, number, number]): Color {
  return {
    r: Number(color[0]),
    g: Number(color[1]),
    b: Number(color[2]),
  };
}

export function parseRGBAtoString(color: [number, number, number, number]): string {
  return `rgb(${color[0]},${color[1]},${color[2]})`;
}
