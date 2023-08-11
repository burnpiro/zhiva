import { Cornerstone3dReactViewportProps } from '../../Cornerstone3dReactViewportProps';
import { Types as CSToolsTypes } from '@cornerstonejs/tools';

export function getAddedTools(
  newTools: Cornerstone3dReactViewportProps['tools'],
  oldTools: [string, any][] //Cornerstone should export IBaseTool
) {
  return newTools?.filter(
    (newTool) =>
      !oldTools.some(([prevToolKey, prevTool]) => prevToolKey === newTool.name)
  );
}

export function getRemovedTools(
  newTools: Cornerstone3dReactViewportProps['tools'],
  oldTools: [string, any][] //Cornerstone should export IBaseTool
) {
  return oldTools.filter(
    ([prevToolKey, prevTool]) =>
      !newTools?.some((newTool) => newTool.name === prevToolKey)
  );
}

export function getModifiedTools(
  newTools: Cornerstone3dReactViewportProps['tools'],
  oldTools: [string, any][], //Cornerstone should export IBaseTool
  oldToolsOptions: Record<string, CSToolsTypes.ToolOptionsType>
) {
  return newTools?.filter((newTool) =>
    oldTools.some(([prevToolKey, prevTool]) => {
      return (
        prevToolKey === newTool.name &&
        (prevTool.mode !== newTool.mode ||
          JSON.stringify(oldToolsOptions[prevToolKey].bindings) !==
            JSON.stringify(newTool.bindings ? [newTool.bindings] : []))
      );
    })
  );
}

export function getToolDiff(
  toolGroup: CSToolsTypes.IToolGroup,
  newTools: Cornerstone3dReactViewportProps['tools']
): {
  added: Cornerstone3dReactViewportProps['tools'];
  removed: [toolKey: string, tool: any][];
  modified: Cornerstone3dReactViewportProps['tools'];
} {
  const prevTools = Object.entries(toolGroup?._toolInstances || {});
  const removedTools = getRemovedTools(newTools, prevTools);

  const addedTools = getAddedTools(newTools, prevTools);

  // Ignore string tools because those could be only added or removed
  const updatedTools = getModifiedTools(
    newTools,
    prevTools,
    toolGroup?.toolOptions || {}
  );

  return {
    added: addedTools,
    removed: removedTools,
    modified: updatedTools,
  };
}
