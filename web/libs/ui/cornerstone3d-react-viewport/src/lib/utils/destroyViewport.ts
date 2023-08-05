import {
  IStackViewport,
  IVolumeViewport,
} from '@cornerstonejs/core/dist/esm/types';
import { Cornerstone3dReactViewportProps } from '../Cornerstone3dReactViewportProps';
import { RenderingEngine } from '@cornerstonejs/core';
import { ToolGroupManager } from '@cornerstonejs/tools';

export async function destroyViewport(
  viewport: IStackViewport | IVolumeViewport,
  renderingEngine: RenderingEngine,
  props: Cornerstone3dReactViewportProps,
  onDestroyEnd?: () => void
) {
  if (props.toolGroup && viewport) {
    const toolGroupInstance = ToolGroupManager.getToolGroup(props.toolGroup.id);

    if(toolGroupInstance) {
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
