import * as cornerstoneTools from '@cornerstonejs/tools';

import { Cornerstone3dReactViewportProps } from '../../Cornerstone3dReactViewportProps';
import { BaseTool, Types as CSToolsTypes } from '@cornerstonejs/tools';
import { setToolMode } from './setToolMode';

export function addTools(
  toolGroup: CSToolsTypes.IToolGroup,
  newTools: Cornerstone3dReactViewportProps['tools'] = []
) {
  for (const newTool of newTools) {
    try {
      let toolClass = newTool.toolClass;

      // Check if toolClass is provided, otherwise get class form cornerstone tools export.
      if (!toolClass) {
        toolClass = cornerstoneTools[
          (newTool.name + 'Tool') as keyof typeof cornerstoneTools
        ] as typeof BaseTool;
      }

      cornerstoneTools.addTool(toolClass);

      toolGroup.addTool(toolClass.toolName);

      setToolMode(newTool.mode, newTool, toolGroup);
    } catch (e: any) {
      console.error(e);
    }
  }
}
