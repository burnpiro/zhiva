import * as cornerstoneTools from '@cornerstonejs/tools';
import {
  Types as CSToolsTypes,
  utilities,
  Enums as CSToolsEnums,
} from '@cornerstonejs/tools';
import {
  getEnabledElement,
  Types as CSTypes,
  triggerEvent,
  utilities as CSUtils,
} from '@cornerstonejs/core';
import { CornerstoneToolNames } from '@zhiva/utils';
import { ReadonlyVec3, vec3 } from 'gl-matrix';

const { annotation } = cornerstoneTools;

interface AnnotationServiceProps {
  csElement: HTMLDivElement;
}

class AnnotationService {
  public readonly csElement: HTMLDivElement;

  public constructor({ csElement }: AnnotationServiceProps) {
    this.csElement = csElement;
  }

  public getAnnotationManager() {
    const enabledElement = getEnabledElement(this.csElement);
    return annotation.state.getViewportSpecificAnnotationManager(
      enabledElement
    );
  }

  public getAnnotations(): CSToolsTypes.Annotation[] {
    const enabledElement = getEnabledElement(this.csElement);
    if (enabledElement) {
      const annotationManager =
        annotation.state.getViewportSpecificAnnotationManager(enabledElement);
      const { FrameOfReferenceUID, viewport } = enabledElement;

      const frameOfReferenceSpecificAnnotations =
        annotationManager.getFrameOfReferenceAnnotations(FrameOfReferenceUID);

      const allAnnotations = frameOfReferenceSpecificAnnotations
        ? Object.values(frameOfReferenceSpecificAnnotations).reduce(
            (acc, anno) => [...acc, ...anno],
            []
          )
        : [];

      const nonPolygonAnnotations =
        utilities.planar.filterAnnotationsForDisplay(
          viewport,
          allAnnotations.filter(
            (el) =>
              el.metadata.toolName !== CornerstoneToolNames.PlanarFreehandROI
          )
        );

      let polygonAnnotations = allAnnotations.filter(
        (el) => el.metadata.toolName === CornerstoneToolNames.PlanarFreehandROI
      ) as CSToolsTypes.ToolSpecificAnnotationTypes.PlanarFreehandROIAnnotation[];

      if (polygonAnnotations.length > 0) {
        const camera = viewport.getCamera();

        const { spacingInNormalDirection } =
          CSUtils.getTargetVolumeAndSpacingInNormalDir(
            viewport as CSTypes.IVolumeViewport,
            camera
          );

        polygonAnnotations = this.filterFreehandAnnotationsWithinSlice(
          polygonAnnotations,
          camera,
          spacingInNormalDirection
        ) as CSToolsTypes.ToolSpecificAnnotationTypes.PlanarFreehandROIAnnotation[];
      }

      return [...nonPolygonAnnotations, ...polygonAnnotations];
    }

    return [];
  }

  public setAnnotationLabel(annotationId: string, label: string) {
    const currAnnotation = annotation.state.getAnnotation(
      annotationId,
      this.csElement
    );

    currAnnotation.data['text'] = label;

    const { viewportId, renderingEngineId } = getEnabledElement(
      this.csElement
    ) as CSTypes.IEnabledElement;

    this.renderViewportsForTool(currAnnotation.metadata.toolName);

    const eventType = CSToolsEnums.Events.ANNOTATION_MODIFIED;

    triggerEvent(this.csElement, eventType, {
      annotation,
      viewportId,
      renderingEngineId,
    });
    return currAnnotation;
  }

  public setAnnotationVisibility(annotationId: string, checked: boolean) {
    const currAnnotation = annotation.state.getAnnotation(
      annotationId,
      this.csElement
    );
    annotation.visibility.setAnnotationVisibility(annotationId, checked);
    this.renderViewportsForTool(currAnnotation.metadata.toolName);
  }

  public hideAllAnnotations() {
    const enabledElement = getEnabledElement(this.csElement);
    if (enabledElement) {
      const annotationManager =
        annotation.state.getViewportSpecificAnnotationManager(enabledElement);
      const { FrameOfReferenceUID, viewport } = enabledElement;

      const frameOfReferenceSpecificAnnotations =
        annotationManager.getFrameOfReferenceAnnotations(FrameOfReferenceUID);

      const allAnnotations = frameOfReferenceSpecificAnnotations
        ? Object.values(frameOfReferenceSpecificAnnotations).reduce(
            (acc, anno) => [...acc, ...anno],
            []
          )
        : [];

      for (const currAnnotation of allAnnotations) {
        annotation.visibility.setAnnotationVisibility(
          currAnnotation.annotationUID || '',
          false
        );
      }
    }
  }

  public showAllAnnotations() {
    annotation.visibility.showAllAnnotations();
  }

  public setSelectedAnnotation(annotationId: string) {
    const currAnnotation = annotation.state.getAnnotation(
      annotationId,
      this.csElement
    );
    annotation.selection.setAnnotationSelected(annotationId, true);
    this.renderViewportsForTool(currAnnotation.metadata.toolName);
  }

  public renderViewportsForTool(toolName: string) {
    const { renderingEngine } = getEnabledElement(
      this.csElement
    ) as CSTypes.IEnabledElement;

    const viewportIdsToRender =
      utilities.viewportFilters.getViewportIdsWithToolToRender(
        this.csElement,
        toolName
      );
    utilities.triggerAnnotationRenderForViewportIds(
      renderingEngine,
      viewportIdsToRender
    );
  }

  public deleteAnnotation(annotationId: string) {
    const currAnnotation = annotation.state.getAnnotation(
      annotationId,
      this.csElement
    );

    annotation.state.removeAnnotation(annotationId, this.csElement);
    this.renderViewportsForTool(currAnnotation.metadata.toolName);
  }

  // Borrowed from @cornerstone/tools PlanarFreehandROITool.ts implementation, since it's private method of the annotation (should be static)
  private filterFreehandAnnotationsWithinSlice(
    annotations: CSToolsTypes.ToolSpecificAnnotationTypes.PlanarFreehandROIAnnotation[],
    camera: CSTypes.ICamera,
    spacingInNormalDirection: number
  ): CSToolsTypes.Annotation[] {
    const { viewPlaneNormal } = camera;
    const annotationsWithSameNormal = annotations.filter((td) => {
      const annotationViewPlaneNormal = td.metadata.viewPlaneNormal;
      return annotationViewPlaneNormal && viewPlaneNormal
        ? CSUtils.isEqual(annotationViewPlaneNormal, viewPlaneNormal)
        : false;
    });

    // No in plane annotations.
    if (!annotationsWithSameNormal.length) {
      return [];
    }

    // Annotation should be within the slice, which means that it should be between
    // camera's focalPoint +/- spacingInNormalDirection.

    const halfSpacingInNormalDirection = spacingInNormalDirection / 2;
    const { focalPoint } = camera;

    const annotationsWithinSlice = [];

    for (const annotation of annotationsWithSameNormal) {
      const data = annotation.data;
      const point = data.polyline[0];

      // A = point
      // B = focal point
      // P = normal

      // B-A dot P  => Distance in the view direction.
      // this should be less than half the slice distance.

      const dir = vec3.create();

      vec3.sub(dir, focalPoint as ReadonlyVec3, point);

      const dot = vec3.dot(dir, viewPlaneNormal as ReadonlyVec3);

      if (Math.abs(dot) < halfSpacingInNormalDirection) {
        annotationsWithinSlice.push(annotation);
      }
    }

    return annotationsWithinSlice;
  }
}

export { AnnotationService };
