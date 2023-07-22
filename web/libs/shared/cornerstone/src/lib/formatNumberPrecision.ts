export function formatNumberPrecision(number: string, precision: number) {
  if (number !== null) {
    return parseFloat(number).toFixed(precision);
  }
  return '';
}
