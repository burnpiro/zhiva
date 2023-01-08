import { useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import OpenIcon from '@mui/icons-material/Launch';
import { styled } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { StudyObj } from '@zhiva/types';
import { Typography } from '@zhiva/ui-components';

import { DataFileDef } from '../columnFilter';
import DicomCell from '../DicomCell/DicomCell';

const StyledOpenIcon = styled(OpenIcon)(({ theme }) => ({
  color: theme.palette.secondary.light,
}));

const TopRow = styled(TableRow)({
  '& > *': {
    borderBottom: 'unset',
  },
});

export interface DicomRowProps {
  row: StudyObj;
  columns: DataFileDef[];
  descriptionColumns?: DataFileDef[];
  onStudyOpen: (row: StudyObj) => void;
}

export function DicomRow({
  row,
  columns,
  descriptionColumns,
  onStudyOpen,
}: DicomRowProps) {
  const [open, setOpen] = useState(false);

  const handleClick = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    onStudyOpen(row);
  };
  return (
    <>
      <TopRow onClick={() => setOpen(!open)}>
        <TableCell>
          <IconButton aria-label="expand row" size="small">
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {columns.map((column) => (
          <DicomCell
            key={column.key}
            cellConfig={{ component: 'td', scope: 'row', align: 'left' }}
            value={row[column.key]}
            type={column.type}
          />
        ))}
        <TableCell>
          <Tooltip title={'Open Study'}>
            <StyledOpenIcon onClick={handleClick} />
          </Tooltip>
        </TableCell>
      </TopRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom>
                Additional Information
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    {descriptionColumns?.map((column) => (
                      <TableCell key={column.key} align="left">
                        {column.header}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    {descriptionColumns?.map((descriptionCol) => (
                      <DicomCell
                        key={descriptionCol.key}
                        cellConfig={{
                          component: 'td',
                          scope: 'row',
                          align: 'left',
                        }}
                        value={row[descriptionCol.key]}
                        type={descriptionCol.type}
                      />
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default DicomRow;
