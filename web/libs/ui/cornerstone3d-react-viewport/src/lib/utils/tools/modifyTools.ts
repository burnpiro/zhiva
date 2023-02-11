import {Cornerstone3dReactViewportProps} from '../../Cornerstone3dReactViewportProps';
import {IToolGroup} from '@cornerstonejs/tools/dist/esm/types';
import {setToolMode} from "./setToolMode";
import {ToolModes} from "@cornerstonejs/tools/dist/esm/enums";

export function modifyTools(
  toolGroup: IToolGroup,
  newTools: Cornerstone3dReactViewportProps['tools'] = []
) {
  for (const newTool of newTools) {
    try {
      // TODO
      // Call setToolEnabled() first to remove bindings
      // There should be an improvement in CS to replace bindings not just merge them, i've raised that issue on their Slack channel
      setToolMode(ToolModes.Enabled, newTool, toolGroup);
      setToolMode(newTool.mode, newTool, toolGroup);
    } catch (e: any) {
      console.error(e);
    }
  }
}
