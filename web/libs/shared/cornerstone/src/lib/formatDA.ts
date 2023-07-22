import { parse, format } from 'date-fns';

export function formatDA(date: string, strFormat = 'MMM d, yyyy') {
  if (!date) {
    return;
  }

  // Goal: 'Apr 5, 1999'
  try {
    const parsedDateTime = parse(date, 'yyyyMMdd', new Date());
    const formattedDateTime = format(parsedDateTime, strFormat);

    return formattedDateTime;
  } catch (err) {
    console.error(err);
  }

  return;
}
