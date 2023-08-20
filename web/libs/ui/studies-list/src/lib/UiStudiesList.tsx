import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { StudiesList, StudyObj } from '@zhiva/utils';
import { DataFileDef, filterColumnElements } from './columnFilter';
import DicomRow from './DicomRow/DicomRow';

const columns: DataFileDef[] = [
  {
    key: 'StudyDate',
    header: 'Date',
    type: 'date',
  },
  {
    key: 'PatientName',
    header: 'Patient',
    type: 'text',
    displayOnMobile: false,
  },
  {
    key: 'Modalities',
    header: 'Modality',
    type: 'modality',
  },
];

const descriptionColumns: DataFileDef[] = [
  {
    key: 'PatientName',
    header: 'Patient',
    type: 'text',
    displayOnDesktop: false,
  },
  {
    key: 'StudyDescription',
    header: 'Description',
    type: 'text',
  },
];

const mobileFilter = filterColumnElements([
  { key: 'displayOnMobile', value: false },
]);
const desktopFilters = filterColumnElements([
  { key: 'displayOnDesktop', value: false },
]);

export interface UiStudiesListProps {
  studies: StudiesList;
  onStudySelect: (study: StudyObj) => void;
}

export function UiStudiesList({ studies, onStudySelect }: UiStudiesListProps) {
  const theme = useTheme();
  const isSmallOrLarger = useMediaQuery(theme.breakpoints.up('sm'));
  const columnFilter = isSmallOrLarger ? desktopFilters : mobileFilter;

  const handleOpenStudy = (study: StudyObj) => {
    onStudySelect(study);
  };
  return (
    <TableContainer
      component={Paper}
      id={'dicomListContainer'}
      sx={{ maxHeight: 'calc(100%)' }}
    >
      <Table aria-label="studies list" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell />
            {columns.filter(columnFilter).map((column) => (
              <TableCell key={column.key as string} align="left">
                {column.header}
              </TableCell>
            ))}
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {studies.size > 0 &&
            Array.from(studies).map(([studyId, study]) => (
              <DicomRow
                key={studyId}
                row={study}
                onStudyOpen={handleOpenStudy}
                columns={columns.filter(columnFilter)}
                descriptionColumns={descriptionColumns.filter(columnFilter)}
              />
            ))}
          {studies.size === 0 && (
            <TableRow>
              <TableCell />
              <TableCell key="no-data" align="left">
                {'No studies to display, please upload one first.'}
              </TableCell>
              <TableCell />
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UiStudiesList;
