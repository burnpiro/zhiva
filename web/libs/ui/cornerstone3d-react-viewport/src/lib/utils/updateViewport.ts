import { Cornerstone3dReactViewportProps } from '../Cornerstone3dReactViewportProps';
import { updateImages } from './viewport/updateImages';
import { synchronizeTools } from './tools/synchronizeTools';
import { RenderingEngine, Types as CSTypes, Enums as CSEnums } from '@cornerstonejs/core';
import { utilities } from '@cornerstonejs/tools';
import { updateVolumes } from './viewport/updateVolumes';

export async function updateViewport(
  viewport: CSTypes.IViewport,
  renderingEngine: RenderingEngine,
  props: Cornerstone3dReactViewportProps,
  viewportElement: HTMLDivElement,
  onUpdateEnd?: (csElement: HTMLDivElement) => void
) {
  await synchronizeTools(
    viewport,
    renderingEngine,
    props.tools,
    props.toolGroup
  );
  let updated = false;

  if (
    viewport.type === CSEnums.ViewportType.STACK &&
    props.imageIds &&
    (viewport as CSTypes.IStackViewport).getImageIds() !== props.imageIds
  ) {
    await updateImages(viewport as CSTypes.IStackViewport, props.imageIds);
    if (viewportElement && props.isStackPrefetchEnabled) {
      utilities.stackPrefetch.enable(viewportElement);
    }
    updated = true;
  }

  if (viewport.type === CSEnums.ViewportType.ORTHOGRAPHIC && props.volumes) {
    const currVolumeIds = viewport.getActors().map((actor) => actor.uid);
    if (
      props.volumes.filter((volume) => !currVolumeIds.includes(volume.volumeId))
        .length > 0
    ) {
      await updateVolumes(
        viewport as CSTypes.IVolumeViewport,
        props.volumes as CSTypes.IVolumeInput[]
      );
      updated = true;
    }
  }

  if (updated) {
    if (viewport.type === CSEnums.ViewportType.STACK) {
      viewport.render();
    } else {
      console.log(viewport.getActors());
      console.log(renderingEngine.getViewports());
      renderingEngine.renderViewports([viewport.id]);
    }
    if (onUpdateEnd) {
      onUpdateEnd(viewportElement);
    }
  }
}
