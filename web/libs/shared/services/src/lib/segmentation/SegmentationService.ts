import * as cornerstoneTools from '@cornerstonejs/tools';
const {
  SegmentationDisplayTool,
  ToolGroupManager,
  Enums: csToolsEnums,
  segmentation,
} = cornerstoneTools;

import { Segmentation, SegmentationProps } from './Segmentation';
import { BrushColorClass } from '@zhiva/utils';
import {
  parseNameToClassString,
  parseRGBColorToColorArray,
} from '@zhiva/utils-cornerstone';
import { DEFAULT_COLOR, DEFAULT_SEG_CLASS_NAME } from '@zhiva/utils';

class SegmentationService {
  public segmentations: Segmentation[] = [];
  public classes: BrushColorClass[] = [];

  public constructor() {
    const defaultColorClass = segmentation.state.getColorLUT(0) || [
      [0, 0, 0, 0],
      DEFAULT_COLOR,
    ];

    this.classes = [
      {
        name: DEFAULT_SEG_CLASS_NAME,
        classId: parseNameToClassString(DEFAULT_SEG_CLASS_NAME),
        color: defaultColorClass[1],
        activeLabelmapIndex: 0,
        source: 'setting',
        modified: false,
      },
    ];
    console.log(this.classes);
  }

  public async generateSegmentationForVolume(
    props: SegmentationProps,
    volumeId: string,
    colorLUTIndex?: number
  ): Promise<Segmentation | undefined> {
    if (!this.hasSegmentation(props.id)) {
      const newSeg = new Segmentation(props);

      await newSeg.initializeSegmentationFromVolume(volumeId);

      if (colorLUTIndex) {
        newSeg.colorLUTIndex = colorLUTIndex;
      }

      this.addSegmentation(newSeg);

      return newSeg;
    } else {
      console.log('REPLACE SEGMENTATION');
      const currSeg = this.segmentations.find((el) => el.id === props.id);
      if (currSeg) {
        await currSeg.initializeSegmentationFromVolume(volumeId, false);
        this.replaceSegmentation(currSeg);
      }
      return currSeg;
    }
  }

  public addSegmentation(newSeg: Segmentation) {
    try {
      const segAdded = SegmentationService.addSegmentationToCS(newSeg);
      this.segmentations.push(newSeg);
    } catch (e: any) {
      console.error(e);
    }
  }

  public setBrushClassForSegmentation(
    segmentationId: string,
    brushClassId: BrushColorClass['classId']
  ) {
    const selectedClass = this.classes.find(
      (el) => el.classId === brushClassId
    );
    const segIndex = this.segmentations.findIndex(
      (seg) => seg.id === segmentationId
    );

    if (selectedClass && segIndex > -1) {
      this.segmentations = this.segmentations.map(seg => {
        if(seg.id === segmentationId) {
          seg.setBrushClass(selectedClass);
        }

        console.log(`set brushClass`, selectedClass.activeLabelmapIndex)
        return seg
      });
    } else {
      console.warn(
        `Setting brush color to segmentation: ${brushClassId} to segmentation ${segmentationId} failed`
      );
    }
  }

  public replaceSegmentation(newSeg: Segmentation) {
    try {
      const segAdded = SegmentationService.addSegmentationToCS(newSeg);
      this.segmentations = this.segmentations.map((el) =>
        el.id === newSeg.id ? newSeg : el
      );
    } catch (e: any) {
      console.error(e);
    }
  }

  public hasSegmentation(segmentationId: string): boolean {
    return this.segmentations.find((el) => el.id === segmentationId) != null;
  }

  public static addSegmentationToCS(newSeg: Segmentation): boolean {
    try {
      const isSegmentationInCS = segmentation.state.getSegmentation(newSeg.id);
      if (!isSegmentationInCS) {
        segmentation.addSegmentations([
          {
            segmentationId: newSeg.id,
            representation: {
              type: newSeg.type,
              data: {
                volumeId: newSeg.id,
              },
            },
          },
        ]);
        return true;
      }
      return false;
    } catch (e: any) {
      console.error(e);
      return false;
    }
  }

  public addColorClass(newClass: BrushColorClass): void {
    this.classes.push(newClass);
  }

  public generateNewClass(
    name: string,
    color: BrushColorClass['color'],
    labelMapIndex?: BrushColorClass['activeLabelmapIndex'],
    source: BrushColorClass['source'] = 'manual'
  ): BrushColorClass {
    // Get index which is 1 higher than current highest index
    const currLabelMapIndex =
      this.classes.reduce(
        (acc, currClass) =>
          currClass.activeLabelmapIndex > acc
            ? currClass.activeLabelmapIndex
            : acc,
        0
      ) + 1;
    return {
      name: name,
      classId: parseNameToClassString(name),
      color: color,
      activeLabelmapIndex: labelMapIndex || currLabelMapIndex,
      source: source,
      modified: true,
    };
  }

  public mergeClasses(newClasses: BrushColorClass[]) {
    for (const newClass of newClasses) {
      const currClassIdx = this.classes.findIndex(
        (el) => el.classId === newClass.classId
      );

      if (newClass.modified) {
        // Add class color to LUT under given LabelmapIndex
        segmentation.state.addColorLUT(
          [[0, 0, 0, 0], newClass.color],
          newClass.activeLabelmapIndex
        );
        newClass.modified = false;
      }

      if (currClassIdx > -1) {
        this.classes[currClassIdx] = {
          ...this.classes[currClassIdx],
          ...newClass,
        };
      } else {
        this.addColorClass(newClass);
      }
    }
  }
}

export { SegmentationService };
