import { Cornerstone3dReactViewportProps } from '../../Cornerstone3dReactViewportProps';
import { ToolGroupManager } from '@cornerstonejs/tools';
import {
  IStackViewport,
  IVolumeViewport,
} from '@cornerstonejs/core/dist/esm/types';
import { RenderingEngine } from '@cornerstonejs/core';
import { v4 as uuidv4 } from 'uuid';
import { getToolDiff } from './getToolDiff';
import { IToolGroup } from '@cornerstonejs/tools/dist/esm/types';
import { addTools } from './addTools';
import { removeTools } from './removeTools';
import { modifyTools } from './modifyTools';

export async function synchronizeTools(
  viewport: IStackViewport | IVolumeViewport,
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
    // Create ToolGroup with given ID if it doesn't exists inside manager
    toolGroupInstance =
      ToolGroupManager.getToolGroup(toolGroup.id) ||
      ToolGroupManager.createToolGroup(toolGroup.id);

    const { added, removed, modified } = getToolDiff(
      toolGroupInstance as IToolGroup,
      newTools
    );

    addTools(toolGroupInstance as IToolGroup, added);
    removeTools(toolGroupInstance as IToolGroup, removed);
    modifyTools(toolGroupInstance as IToolGroup, modified);
    console.log(added, removed, modified);
  }

  if (newTools && !toolGroup) {
    // check if there is ToolGroup already assigned
    toolGroupInstance = ToolGroupManager.getToolGroupForViewport(
      viewport.id,
      renderingEngine.id
    );

    if (!toolGroupInstance) {
      toolGroupInstance = ToolGroupManager.createToolGroup(uuidv4());

      addTools(toolGroupInstance as IToolGroup, newTools);
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
    console.log('add instance')
    toolGroupInstance.addViewport(viewport.id, renderingEngine.id);
  }

  return;
}
