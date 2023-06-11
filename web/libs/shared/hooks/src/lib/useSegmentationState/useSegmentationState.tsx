import { useEffect, useState } from 'react';
import * as cornerstoneTools from '@cornerstonejs/tools';
import { Types as CSToolsTypes } from '@cornerstonejs/tools';
import { BrushColorClass } from '@zhiva/utils';
import { Enums as CSToolsEnums } from '@cornerstonejs/tools';
import { Enums as CSEnums } from '@cornerstonejs/core';
import {
  addInternalCSEvents,
  removeInternalCSEvents,
} from '@zhiva/utils-cornerstone';
const { segmentation } = cornerstoneTools;

type SegmentationState = {
  colorLUT: CSToolsTypes.Color[];
  activeSegmentations: string[];
  classes: BrushColorClass[];
  selectedSegmentations: string[];
};

export function useSegmentationState(toolGroupId: string): SegmentationState {
  const [segState, setSegState] = useState<SegmentationState>({
    colorLUT: [],
    activeSegmentations: [],
    classes: [],
    selectedSegmentations: [],
  });

  useEffect(() => {
    const updateActiveSegmentations = () => {
      const stateManager =
        segmentation.state.getDefaultSegmentationStateManager();

      const currentState = stateManager.getState();
      // Map existing LUTs to list of their first color values
      // 0 index is always transparent so we use 1
      const colorLUT = currentState.colorLUT.map((lut) => lut[1]);
      const activeSegmentations = currentState.toolGroups[
        toolGroupId
      ].segmentationRepresentations
        .filter((segRep) => segRep.visibility === true)
        .map((segRep) => segRep.segmentationId);
      // console.log(currentState);

      const selectedSegmentations = currentState.toolGroups[
        toolGroupId
      ].segmentationRepresentations
        .filter((segRep) => segRep.active === true)
        .map((segRep) => segRep.segmentationId);

      setSegState({
        ...segState,
        colorLUT: colorLUT,
        activeSegmentations: activeSegmentations,
        selectedSegmentations: selectedSegmentations
      });
    };

    updateActiveSegmentations();

    addInternalCSEvents([
      {
        event: CSToolsEnums.Events.SEGMENTATION_REPRESENTATION_MODIFIED,
        callback: updateActiveSegmentations,
      },
    ]);

    return () => {
      removeInternalCSEvents([
        {
          event: CSToolsEnums.Events.SEGMENTATION_REPRESENTATION_MODIFIED,
          callback: updateActiveSegmentations,
        },
      ]);
    };
  }, []);

  return segState;
}
