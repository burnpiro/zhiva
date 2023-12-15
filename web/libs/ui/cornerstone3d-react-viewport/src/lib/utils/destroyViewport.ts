import { Cornerstone3dReactViewportProps } from '../Cornerstone3dReactViewportProps';
import { RenderingEngine } from '@cornerstonejs/core';
import { ToolGroupManager } from '@cornerstonejs/tools';

import { Types as CSTypes } from '@cornerstonejs/core';


export async function destroyViewport(
  viewport: CSTypes.IViewport,
  renderingEngine: RenderingEngine,
  props: Cornerstone3dReactViewportProps,
  onDestroyEnd?: () => void
) {
  if (props.toolGroup && viewport) {
    const toolGroupInstance = ToolGroupManager.getToolGroup(props.toolGroup.id);

    if (toolGroupInstance) {
      toolGroupInstance.removeViewports(renderingEngine.id, viewport.id);
    }

    viewport.removeAllActors();
    console.log('destroyed', viewport.id);
    renderingEngine.disableElement(viewport.id);

    if (onDestroyEnd) {
      onDestroyEnd();
    }
  }
}
