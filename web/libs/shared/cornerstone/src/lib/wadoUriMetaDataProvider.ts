import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import * as dicomParser from 'dicom-parser';
const { parseImageId, dataSetCacheManager } =
  cornerstoneWADOImageLoader.wadouri;

export function wadoUriMetaDataProvider(
  type: string,
  imageId: string
): { [key: string | number | symbol]: any } | undefined {
  const parsedImageId = parseImageId(imageId);
  const dataSet = dataSetCacheManager.get(parsedImageId.url);

  if (!dataSet) {
    return;
  }

  try {
    if (type === 'generalImageModule') {
      return {
        sopInstanceUid: dataSet.string('x00080018'),
        instanceNumber: dataSet.intString('x00200013'),
        lossyImageCompression: dataSet.string('x00282110'),
        lossyImageCompressionRatio: dataSet.string('x00282112'),
        lossyImageCompressionMethod: dataSet.string('x00282114'),
      };
    }

    if (type === 'patientModule') {
      return {
        patientName: dataSet.string('x00100010'),
        patientId: dataSet.string('x00100020'),
      };
    }

    if (type === 'generalStudyModule') {
      return {
        studyDescription: dataSet.string('x00081030'),
        studyDate: dataSet.string('x00080020'),
        studyTime: dataSet.string('x00080030'),
      };
    }

    if (type === 'cineModule') {
      return {
        frameTime: dataSet.float('x00181063'),
      };
    }
  } catch (e: any) {
    console.error(e);
    return {};
  }

  if (dataSet.elements[type] !== undefined) {
    const element = dataSet.elements[type];
    if (!element.vr) {
      return;
    }

    return {
      [type]: dicomParser.explicitElementToString(dataSet, element),
    };
  }

  return;
}
