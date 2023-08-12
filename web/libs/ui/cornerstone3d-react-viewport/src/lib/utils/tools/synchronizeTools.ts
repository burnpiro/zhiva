import { Cornerstone3dReactViewportProps } from '../../Cornerstone3dReactViewportProps';
import { ToolGroupManager, Types as CSToolsTypes } from '@cornerstonejs/tools';
import { RenderingEngine, Types as CSTypes } from '@cornerstonejs/core';
import { v4 as uuidv4 } from 'uuid';
import { getToolDiff } from './getToolDiff';
import { addTools } from './addTools';
import { removeTools } from './removeTools';
import { modifyTools } from './modifyTools';

export async function synchronizeTools(
  viewport: CSTypes.IStackViewport | CSTypes.IVolumeViewport,
  renderingEngine: RenderingEngine,
  newTools: Cornerstone3dReactViewportProps['tools'],
  toolGroup: Cornerstone3dReactViewportProps['toolGroup']
) {
  let toolGroupInstance = null;
  if (!newTools && toolGroup) {
    toolGroupInstance = ToolGroupManager.getToolGroup(toolGroup.id);
    if (!toolGroupInstance) {
      throw new Error(
        `Selected toolGroup: ${toolGroup.id} doesn't exist, if you provide toolGroup only you have to make sure it is already instantiate`
      );
    }
    return;
  }

  if (newTools && toolGroup) {
    // Create ToolGroup with given ID if it doesn't exist inside manager
    toolGroupInstance =
      ToolGroupManager.getToolGroup(toolGroup.id) ||
      ToolGroupManager.createToolGroup(toolGroup.id);

    const { added, removed, modified } = getToolDiff(
      toolGroupInstance as CSToolsTypes.IToolGroup,
      newTools
    );

    addTools(toolGroupInstance as CSToolsTypes.IToolGroup, added);
    removeTools(toolGroupInstance as CSToolsTypes.IToolGroup, removed);
    modifyTools(toolGroupInstance as CSToolsTypes.IToolGroup, modified);
  }

  if (newTools && !toolGroup) {
    // check if there is ToolGroup already assigned
    toolGroupInstance = ToolGroupManager.getToolGroupForViewport(
      viewport.id,
      renderingEngine.id
    );

    if (!toolGroupInstance) {
      toolGroupInstance = ToolGroupManager.createToolGroup(uuidv4());

      addTools(toolGroupInstance as CSToolsTypes.IToolGroup, newTools);
    } else {
      const { added, removed, modified } = getToolDiff(
        toolGroupInstance,
        newTools
      );

      addTools(toolGroupInstance, added);
      removeTools(toolGroupInstance, removed);
      modifyTools(toolGroupInstance, modified);
    }
  }

  if (
    toolGroupInstance &&
    !toolGroupInstance.getViewportIds().includes(viewport.id)
  ) {
    toolGroupInstance.addViewport(viewport.id, renderingEngine.id);
  }

  return;
}
