import {StudyObj} from "@zhiva/types";
import {DicomCellProps} from "./DicomCell/DicomCell";

export type DataFileDef = {
  key: keyof StudyObj;
  header: string;
  type: DicomCellProps['type'];
  maxWidth?: string; //in px
  displayOnMobile?: boolean;
  displayOnDesktop?: boolean;
  align?: 'right' | 'left' | 'center';
}

type ColumnFilter = {
  key: keyof DataFileDef,
  value?: any
}

/**
 * Filters out columns when at least one of the condition is true
 * @param filters
 */
export function filterColumnElements(filters: ColumnFilter[] = []) {
  return (column: DataFileDef): boolean => {
    return !filters.some(filter => column[filter.key] === filter.value)
  }
}
