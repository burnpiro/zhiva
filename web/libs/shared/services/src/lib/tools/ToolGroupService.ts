import * as cornerstoneTools from '@cornerstonejs/tools';
const { segmentation } = cornerstoneTools;

import { Segmentation } from '../segmentation';
import { BrushColorClass } from '@zhiva/utils';

class ToolGroupService {
  public static async addSegmentationsToToolGroup(
    segList: Segmentation[],
    toolGroupId: string
  ): Promise<string[]> {
    ToolGroupService.removeSegmentationsFromToolGroup(toolGroupId, segList);
    if (segList.length > 0) {
      console.log(segList);
      const representations = await segmentation.addSegmentationRepresentations(
        toolGroupId,
        segList.map((seg) => ({
          segmentationId: seg.id,
          type: seg.type
        }))
      );
      for (const seg of segList) {
        console.log('set segcolor ', seg.id, seg.colorLUTIndex)
        ToolGroupService.setSegmentationColor(
          toolGroupId,
          seg,
          seg.colorLUTIndex
        );
      }
      return representations;
    }
    return [];
  }

  public static removeSegmentationsFromToolGroup(
    toolGroupId: string,
    segList: Segmentation[]
  ) {
    const toolGroupRepresentations =
      segmentation.state.getSegmentationRepresentations(toolGroupId) || [];

    const existingSegRepresentations = segList.filter(
      (seg) =>
        toolGroupRepresentations.length !== 0 ||
        toolGroupRepresentations
          .map((rep) => rep.segmentationId)
          .includes(seg.id)
    );

    if (existingSegRepresentations.length > 0) {
      segmentation.removeSegmentationsFromToolGroup(
        toolGroupId,
        existingSegRepresentations
          .filter((seg) =>
            toolGroupRepresentations.find(
              (rep) => rep.segmentationId === seg.id
            )
          )
          .map(
            (seg) =>
              toolGroupRepresentations.find(
                (rep) => rep.segmentationId === seg.id
              )?.segmentationRepresentationUID || ''
          )
      );
    }
  }

  public static setSegmentationVisibility(
    toolGroupId: string,
    segObj: Segmentation,
    visibility: boolean
  ): void {
    const toolGroupRepresentations =
      segmentation.state.getSegmentationRepresentations(toolGroupId) || [];

    const segRepresentation = toolGroupRepresentations.find(
      (rep) => rep.segmentationId === segObj.id
    );

    if (segRepresentation) {
      segmentation.config.visibility.setSegmentationVisibility(
        toolGroupId,
        segRepresentation.segmentationRepresentationUID,
        visibility
      );
    } else {
      console.warn(
        `Trying to set visibility to non-existing segmentation: ${segObj.id}`
      );
    }
  }

  public static setActiveSegmentation(
    toolGroupId: string,
    segObj: Segmentation
  ): void {
    const toolGroupRepresentations =
      segmentation.state.getSegmentationRepresentations(toolGroupId) || [];

    const segRepresentation = toolGroupRepresentations.find(
      (rep) => rep.segmentationId === segObj.id
    );

    if (segRepresentation) {
      segmentation.activeSegmentation.setActiveSegmentationRepresentation(
        toolGroupId,
        segRepresentation.segmentationRepresentationUID
      );
    } else {
      console.warn(
        `Trying to set visibility to non-existing segmentation: ${segObj.id}`
      );
    }
  }

  public static setSegmentationColor(
    toolGroupId: string,
    segObj: Segmentation,
    activeLabelmapIndex: BrushColorClass['activeLabelmapIndex']
  ): void {
    const toolGroupRepresentations =
      segmentation.state.getSegmentationRepresentations(toolGroupId) || [];

    const segRepresentation = toolGroupRepresentations.find(
      (rep) => rep.segmentationId === segObj.id
    );

    if (segRepresentation) {
      segmentation.config.color.setColorLUT(
        toolGroupId,
        segRepresentation.segmentationRepresentationUID,
        activeLabelmapIndex
      );
    } else {
      console.warn(
        `Trying to set color to non-existing segmentation: ${segObj.id}`
      );
    }
  }
}

export { ToolGroupService };
