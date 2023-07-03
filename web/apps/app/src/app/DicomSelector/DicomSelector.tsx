import { StudiesContext } from '@zhiva/react-contexts';
import { UiDicomDropzone } from '@zhiva/dicom-dropzone';
import { UiStudiesList } from '@zhiva/studies-list';
import { StudyObj } from '@zhiva/utils';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';

export function DicomSelector() {
  const navigate = useNavigate();
  const { studies } = useContext(StudiesContext);
  const handleSelectStudies = (study: StudyObj) => {
    navigate(`/studies/${study.StudyInstanceUID}`);
  };

  return (
    <Box sx={{ p: 2 }}>
      <UiDicomDropzone />
      <UiStudiesList studies={studies} onStudySelect={handleSelectStudies} />
    </Box>
  );
}
