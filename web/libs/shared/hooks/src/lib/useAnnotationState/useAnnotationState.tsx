import { useEffect, useState } from 'react';
import {
  Types as CSToolsTypes,
  Enums as CSToolsEnums,
} from '@cornerstonejs/tools';
import { Enums as CSEnums } from '@cornerstonejs/core';
import throttle from 'lodash.throttle';
import {
  addElementCSEvents,
  addInternalCSEvents,
  removeElementCSEvents,
  removeInternalCSEvents,
} from '@zhiva/utils-cornerstone';
import { AnnotationService } from '@zhiva/services';

type AnnotationState = {
  annotations: CSToolsTypes.Annotation[];
  hiddenAnnotations: string[];
  selectedAnnotations: string[];
};

export function useAnnotationState(
  annotationService: AnnotationService
): AnnotationState {
  const [annoState, setAnnoState] = useState<AnnotationState>({
    annotations: [],
    hiddenAnnotations: [],
    selectedAnnotations: [],
  });

  useEffect(() => {
    const updateAnnotations = throttle(
      (event?: any) => {
        setAnnoState((currState) => ({
          ...currState,
          annotations: annotationService.getAnnotations(),
        }));
      },
      200,
      { trailing: true, leading: false }
    );

    const updateAnnotationsOnCameraChange = throttle(
      (event?: any) => {
        setAnnoState((currState) => ({
          ...currState,
          annotations: annotationService.getAnnotations(),
        }));
      },
      500,
      { trailing: true, leading: false }
    );

    const updateAnnotationsVisibility = throttle((event: any) => {
      const newHiddenAnnotations = [...(event.detail.hidden || [])];
      setAnnoState((currState) => ({
        ...currState,
        hiddenAnnotations: newHiddenAnnotations,
      }));
    }, 100);

    const updateSelectedAnnotations = throttle((event: any) => {
      const selectedAnnotations = [...(event.detail.selection || [])];
      setAnnoState((currState) => ({
        ...currState,
        selectedAnnotations: selectedAnnotations,
      }));
    }, 100);

    updateAnnotations();

    addElementCSEvents(
      [
        {
          event: CSEnums.Events.CAMERA_MODIFIED,
          callback: updateAnnotationsOnCameraChange,
        },
      ],
      annotationService.csElement
    );

    addInternalCSEvents([
      {
        event: CSToolsEnums.Events.ANNOTATION_MODIFIED,
        callback: updateAnnotations,
      },
      {
        event: CSToolsEnums.Events.ANNOTATION_ADDED,
        callback: updateAnnotations,
      },
      {
        event: CSToolsEnums.Events.ANNOTATION_REMOVED,
        callback: updateAnnotations,
      },
      {
        event: CSToolsEnums.Events.ANNOTATION_VISIBILITY_CHANGE,
        callback: updateAnnotationsVisibility,
      },
      {
        event: CSToolsEnums.Events.ANNOTATION_SELECTION_CHANGE,
        callback: updateSelectedAnnotations,
      },
    ]);

    return () => {
      removeElementCSEvents(
        [
          {
            event: CSEnums.Events.CAMERA_MODIFIED,
            callback: updateAnnotationsOnCameraChange,
          },
        ],
        annotationService.csElement
      );

      removeInternalCSEvents([
        {
          event: CSToolsEnums.Events.ANNOTATION_MODIFIED,
          callback: updateAnnotations,
        },
        {
          event: CSToolsEnums.Events.ANNOTATION_ADDED,
          callback: updateAnnotations,
        },
        {
          event: CSToolsEnums.Events.ANNOTATION_REMOVED,
          callback: updateAnnotations,
        },
        {
          event: CSToolsEnums.Events.ANNOTATION_VISIBILITY_CHANGE,
          callback: updateAnnotationsVisibility,
        },
        {
          event: CSToolsEnums.Events.ANNOTATION_SELECTION_CHANGE,
          callback: updateSelectedAnnotations,
        },
      ]);
    };
  }, []);

  return annoState;
}
