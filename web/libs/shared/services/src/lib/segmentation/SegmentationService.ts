import * as cornerstoneTools from '@cornerstonejs/tools';
const {
  SegmentationDisplayTool,
  ToolGroupManager,
  Enums: csToolsEnums,
  segmentation,
} = cornerstoneTools;

import { Segmentation, SegmentationProps } from './Segmentation';

class SegmentationService {
  public segmentations: Segmentation[] = [];

  public async generateSegmentationForVolume(
    props: SegmentationProps,
    volumeId: string
  ) {
    const newSeg = new Segmentation(props);

    await newSeg.initializeSegmentationFromVolume(volumeId);

    this.addSegmentation(newSeg);
  }

  public addSegmentation(newSeg: Segmentation) {
    try {
      const segAdded = SegmentationService.addSegmentationToCS(newSeg);
      this.segmentations.push(newSeg);
    } catch (e: any) {
      console.error(e);
    }
  }

  public static addSegmentationToCS(newSeg: Segmentation): boolean {
    try {
      const isSegmentationInCS = segmentation.state.getSegmentation(newSeg.id);
      if (!isSegmentationInCS) {
        segmentation.addSegmentations([
          {
            segmentationId: newSeg.id,
            representation: {
              type: newSeg.type,
              data: {
                volumeId: newSeg.id,
              },
            },
          },
        ]);
        return true;
      }
      return false;
    } catch (e: any) {
      console.error(e);
      return false;
    }
  }
}

export { SegmentationService };
