import { IToolGroup } from '@cornerstonejs/tools/dist/esm/types';
import { setToolMode } from './setToolMode';
import { ToolModes } from '@cornerstonejs/tools/dist/esm/enums';

export function removeTools(
  toolGroup: IToolGroup,
  newTools: [toolKey: string, tool: any][] = []
) {
  for (const [toolKey, tool] of newTools) {
    try {
      // There is no remove option in ToolGroup, we can only disable it
      setToolMode(
        ToolModes.Disabled,
        {
          ...tool,
          name: toolKey,
        },
        toolGroup
      );
      // TODO
      // We could use `.removeTool()` on cornerstoneTools but that might cause a problem because tool is still assigned to ToolGroup, just disabled
    } catch (e: any) {
      console.error(e);
    }
  }
}
