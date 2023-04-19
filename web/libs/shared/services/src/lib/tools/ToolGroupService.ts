import * as cornerstoneTools from '@cornerstonejs/tools';
const {
  SegmentationDisplayTool,
  ToolGroupManager,
  Enums: csToolsEnums,
  segmentation,
} = cornerstoneTools;

import { Segmentation } from '../segmentation';

class ToolGroupService {
  public static async addSegmentationsToToolGroup(
    segList: Segmentation[],
    toolGroupId: string
  ): Promise<string[]> {
    const toolGroupRepresentation =
      segmentation.state.getSegmentationRepresentations(toolGroupId);
    const nonExistingSegRepresentations = segList.filter(
      (seg) =>
        !toolGroupRepresentation ||
        !segmentation.state.getSegmentationRepresentationByUID(
          toolGroupId,
          seg.id
        )
    );
    if (nonExistingSegRepresentations.length > 0) {
      return segmentation.addSegmentationRepresentations(
        toolGroupId,
        nonExistingSegRepresentations.map((seg) => ({
          segmentationId: seg.id,
          type: seg.type,
        }))
      );
    }

    return [];
  }
}

export { ToolGroupService };
