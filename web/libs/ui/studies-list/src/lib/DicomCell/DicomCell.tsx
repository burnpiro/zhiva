import TableCell, { TableCellProps } from '@mui/material/TableCell';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import { MODALITIES } from '@zhiva/utils';
import { Modality } from '@zhiva/utils';
import { formatDA } from '@zhiva/utils-cornerstone';

interface DateCellProps {
  date: string; // e.g. '20190805'
  cellConfig?: TableCellProps;
}

export const DateCell = ({ date, cellConfig }: DateCellProps) => {
  const formattedDate = formatDA(date);

  return <TableCell {...cellConfig}>{formattedDate}</TableCell>;
};

interface ModalitiesCellProps {
  modalities: string | string[];
  cellConfig?: TableCellProps;
}

export const ModalitiesCell = ({
  modalities,
  cellConfig,
}: ModalitiesCellProps) => {
  const modalitiesArr = (
    Array.isArray(modalities) ? modalities : [modalities]
  ) as Modality[];
  return (
    <TableCell {...cellConfig}>
      {modalitiesArr.map((modality) => (
        <Tooltip key={modality} title={MODALITIES[modality] || ''}>
          <Chip size={'small'} label={modality} />
        </Tooltip>
      ))}
    </TableCell>
  );
};

export interface DicomCellProps {
  type?: 'date' | 'text' | 'modality';
  value: any | any[];
  cellConfig?: TableCellProps;
}

export function DicomCell({ value, type, cellConfig }: DicomCellProps) {
  if (value == null || value.length === 0) {
    return <TableCell {...cellConfig}>{`<Not Set>`}</TableCell>;
  }
  switch (type) {
    case 'date':
      return (
        <DateCell
          date={Array.isArray(value) ? value[0] : value}
          cellConfig={cellConfig}
        />
      );
    case 'modality':
      return <ModalitiesCell modalities={value} cellConfig={cellConfig} />;
    case 'text':
    default:
      return <TableCell {...cellConfig}>{value}</TableCell>;
  }
}

export default DicomCell;
