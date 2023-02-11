import { MouseBindings, ToolModes } from '@cornerstonejs/tools/dist/esm/enums';
import { Cornerstone3dReactViewportProps } from '../../Cornerstone3dReactViewportProps';
import { ArrayElement } from '@zhiva/types';
import { IToolGroup } from '@cornerstonejs/tools/dist/esm/types';

export function setToolMode(
  mode: ToolModes = ToolModes.Enabled,
  tool: ArrayElement<Cornerstone3dReactViewportProps['tools']>,
  toolGroup: IToolGroup
) {
  switch (mode) {
    case ToolModes.Active:
      toolGroup.setToolActive(
        tool.name,
        tool.bindings
          ? {
              bindings: [tool.bindings],
            }
          : undefined
      );
      break;
    case ToolModes.Passive:
      toolGroup.setToolPassive(tool.name);
      break;
    case ToolModes.Disabled:
      toolGroup.setToolDisabled(tool.name);
      break;
    case ToolModes.Enabled:
    default:
      toolGroup.setToolEnabled(tool.name);
      break;
  }
}
