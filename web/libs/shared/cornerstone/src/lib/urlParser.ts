import {OptionalInstanceUIDs} from '@zhiva/utils';
const urlRegex =
  /(http[s]?:\/\/)?([^/\s]+\/)(.*)?(studies\/)([\w\-.]*)\/(series\/)([\w\-.]*)\/(instances\/)([\w\-.]*)(.*)/;

const wadorsUrlParser = (url: string): OptionalInstanceUIDs => {
  const match = urlRegex.exec(url) || [];
  if(match.length < 10) {
    console.error(`failed when parsing url: ${url}`);
    return {
      StudyInstanceUID: '',
    }
  }
  return {
    StudyInstanceUID: match[5],
    SeriesInstanceUID: match[7],
    SOPInstanceUID: match[9],
  };
};

export { wadorsUrlParser };
