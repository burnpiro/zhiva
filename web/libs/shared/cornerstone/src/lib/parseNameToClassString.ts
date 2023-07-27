export function parseNameToClassString(name: string): string {
  return name.toLowerCase().replace(/\s/g, '_').replace(/\W/g, '');
}
