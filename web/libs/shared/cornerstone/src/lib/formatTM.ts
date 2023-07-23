import { parse, format } from 'date-fns';

export function formatTM(time: number, strFormat = 'HH:mm:ss') {
  if (!time) {
    return;
  }

  // DICOM Time is stored as HHmmss.SSS
  try {
    const inputFormat = 'HHmmss.SSS';
    const strTime = time.toString().substring(0, inputFormat.length);
    const parsedDateTime = parse(strTime, 'HHmmss.SSS', new Date(0));
    return format(parsedDateTime, strFormat);
  } catch (err) {
    console.error('Time Parse Error', time, strFormat);
  }

  return;
}
