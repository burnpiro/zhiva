import { Cornerstone3dReactViewportProps } from '../../Cornerstone3dReactViewportProps';
import { ArrayElement } from '@zhiva/utils';
import {
  Types as CSToolsTypes,
  Enums as CSToolsEnums,
} from '@cornerstonejs/tools';

export function setToolMode(
  mode: CSToolsEnums.ToolModes = CSToolsEnums.ToolModes.Enabled,
  tool: ArrayElement<Cornerstone3dReactViewportProps['tools']>,
  toolGroup: CSToolsTypes.IToolGroup
) {
  switch (mode) {
    case CSToolsEnums.ToolModes.Active:
      toolGroup.setToolActive(
        tool.name,
        tool.bindings
          ? {
              bindings: [tool.bindings],
            }
          : undefined
      );
      break;
    case CSToolsEnums.ToolModes.Passive:
      toolGroup.setToolPassive(tool.name);
      break;
    case CSToolsEnums.ToolModes.Disabled:
      toolGroup.setToolDisabled(tool.name);
      break;
    case CSToolsEnums.ToolModes.Enabled:
    default:
      toolGroup.setToolEnabled(tool.name);
      break;
  }
}
