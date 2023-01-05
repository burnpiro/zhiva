import { TAG_DICT } from '@zhiva/shared/constants';

export type TagElement = {
  tag: string;
  vr: string;
  vm: string;
  name: string;
};

function getTag(tag: string): TagElement {
  var group = tag.substring(1, 5);
  var element = tag.substring(5, 9);
  var tagIndex = ('(' + group + ',' + element + ')').toUpperCase();
  var attr = TAG_DICT[tagIndex];
  return attr;
}

function isStringVr(vr: string): boolean {
  return !(
    vr === 'AT' ||
    vr === 'FL' ||
    vr === 'FD' ||
    vr === 'OB' ||
    vr === 'OF' ||
    vr === 'OW' ||
    vr === 'SI' ||
    vr === 'SQ' ||
    vr === 'SS' ||
    vr === 'UL' ||
    vr === 'US'
  );
}

function isASCII(str: string): boolean {
  return /^[\x00-\x7F]*$/.test(str);
}

function escapeSpecialCharacters(str: string = ''): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export type InstanceMetadata = { [k: string]: string | InstanceMetadata[] };

export function extractInstanceData(dataSet: {
  elements: Record<string, any>;
  string: (el: string) => string;
  uint16: (el: string, i?: number) => number;
  int16: (el: string, i?: number) => number;
  uint32: (el: string, i?: number) => number;
  int32: (el: string, i?: number) => number;
  double: (el: string, i?: number) => number;
  float: (el: string, i?: number) => number;
}): InstanceMetadata | undefined {
  const metaData: InstanceMetadata = {};
  try {
    const keys = Object.keys(dataSet.elements).sort();

    for (const propertyName of keys) {
      const element = dataSet.elements[propertyName];
      const tag = getTag(element.tag);

      if (tag === undefined) {
        continue;
      }

      if (element.items) {
        metaData[tag.name] = element.items.map((item: any) =>
          extractInstanceData(item.dataSet)
        );
      } else {
        const vr = element.vr || tag.vr;
        let value = '';

        switch (vr) {
          case 'US':
            value += dataSet.uint16(propertyName);
            for (
              let i = 1;
              i < dataSet.elements[propertyName].length / 2;
              i++
            ) {
              value += '\\' + dataSet.uint16(propertyName, i);
            }
            break;
          case 'SS':
            value += dataSet.int16(propertyName);
            for (
              let i = 1;
              i < dataSet.elements[propertyName].length / 2;
              i++
            ) {
              value += '\\' + dataSet.int16(propertyName, i);
            }
            break;
          case 'UL':
            value += dataSet.uint32(propertyName);
            for (
              let i = 1;
              i < dataSet.elements[propertyName].length / 4;
              i++
            ) {
              value += '\\' + dataSet.uint32(propertyName, i);
            }
            break;
          case 'SL':
            value += dataSet.int32(propertyName);
            for (
              let i = 1;
              i < dataSet.elements[propertyName].length / 4;
              i++
            ) {
              value += '\\' + dataSet.int32(propertyName, i);
            }
            break;
          case 'FD':
            value += dataSet.double(propertyName);
            for (
              let i = 1;
              i < dataSet.elements[propertyName].length / 8;
              i++
            ) {
              value += '\\' + dataSet.double(propertyName, i);
            }
            break;
          case 'FL':
            value += dataSet.float(propertyName);
            for (
              let i = 1;
              i < dataSet.elements[propertyName].length / 4;
              i++
            ) {
              value += '\\' + dataSet.float(propertyName, i);
            }
            break;
          case 'AT':
            value +=
              'x' +
              ('0000' + dataSet.uint16(propertyName, 0).toString(16)).substr(
                -4
              ) +
              ('0000' + dataSet.uint16(propertyName, 1).toString(16)).substr(
                -4
              );
            break;
          case 'OB':
          case 'OW':
          case 'UN':
          case 'OF':
          case 'UT':
            value = 'binary data';
            break;
          default:
            if (isStringVr(vr)) {
              if (isASCII(dataSet.string(propertyName))) {
                value = escapeSpecialCharacters(dataSet.string(propertyName));
              }
            } else {
              value = `No display code for VR ${vr}`;
            }
        }

        metaData[tag.name] = value;
      }
    }

    return metaData;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}
