import { useDropzone } from 'react-dropzone';
import { useCallback, useContext, useEffect, useState } from 'react';
import { styled } from '@mui/system';
import { Button, Theme } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import LinearProgress, {
  LinearProgressProps,
} from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ListSubheader from '@mui/material/ListSubheader';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { FilesContext, FileActionTypes } from '@zhiva/react-contexts';

const getColor = (props: {
  isdragaccept?: string;
  isdragreject?: string;
  isfocused?: string;
  isdragactive?: string;
  theme: Theme;
}) => {
  if (props.isdragaccept) {
    return '#00e676';
  }
  if (props.isdragreject) {
    return '#ff1744';
  }
  if (props.isfocused) {
    return '#2196f3';
  }
  return props.theme.palette.text.primary;
};

const DropContainer = styled('div')((props) => ({
  flex: 1,
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: '2px',
  borderRadius: '2px',
  borderColor: getColor(props as any),
  borderStyle: 'dashed',
  backgroundColor: props.theme.palette['background'].default,
  color: props.theme.palette['text'].primary,
  outline: 'none',
  transition: 'border .24s ease-in-out',
}));

/* eslint-disable-next-line */
export interface UiDicomDropzoneProps {
  title?: string;
}

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number; label: string }
) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', pt: 1 }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">
          {props.label}
        </Typography>
      </Box>
    </Box>
  );
}

export function UiDicomDropzone({
  title = `Drag 'n' drop some DICOMs here, or click to select DICOMs`,
}: UiDicomDropzoneProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isQueued, setIsQueued] = useState<boolean>(false);
  const { state, dispatch, queueFiles } = useContext(FilesContext);
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = [];
      for (const file of acceptedFiles) {
        newFiles.push(file);
      }
      setFiles(
        [...files, ...newFiles].filter(
          (file) => !state.loadedFiles.has(file.name)
        )
      );
    },
    [files, setFiles]
  );
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop });

  useEffect(() => {
    if (
      files.length > 0 &&
      files.some((file) => state.loadedFiles.has(file.name))
    ) {
      setFiles(files.filter((file) => !state.loadedFiles.has(file.name)));
    }
  }, [state.loadedFiles, files]);

  const handleProcessFiles = () => {
    queueFiles(files);
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleRemoveFile = (file: File) => {
    setFiles([...files].filter((el) => el.name !== file.name));
    dispatch({
      type: FileActionTypes.REMOVE_FILES_TO_LOAD,
      payload: {
        files: [file.name],
      },
    });
    dispatch({
      type: FileActionTypes.SET_ERROR,
      payload: {
        isError: false,
      },
    });
  };

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', position: 'relative' }}
    >
      <DropContainer
        {...getRootProps({
          isdragactive: isDragActive ? 'true' : undefined,
          isfocused: isFocused ? 'true' : undefined,
          isdragaccept: isDragAccept ? 'true' : undefined,
          isdragreject: isDragReject ? 'true' : undefined,
        })}
      >
        <input {...getInputProps()} />
        <p>{title}</p>
      </DropContainer>
      {(state.isLoading || state.filesToLoad.size > 0) && (
        <LinearProgressWithLabel
          color={
            state.loadedFiles.size ===
            state.loadedFiles.size + state.filesToLoad.size
              ? 'success'
              : 'primary'
          }
          value={
            (state.loadedFiles.size /
              (state.loadedFiles.size + state.filesToLoad.size)) *
            100
          }
          label={`${state.loadedFiles.size}/${
            state.loadedFiles.size + state.filesToLoad.size
          }`}
        />
      )}

      <ListSubheader
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pt: 1,
          pb: 1,
        }}
      >
        <Button
          variant={'text'}
          size={'small'}
          color={'inherit'}
          onClick={toggleOpen}
          disabled={files.length === 0}
        >
          {isOpen ? 'Hide' : 'Show'}
          {isOpen ? <ExpandLess /> : <ExpandMore />}
        </Button>
        <Button
          variant={'contained'}
          size={'small'}
          disabled={files.length === 0}
          sx={{ maxHeight: 32 }}
          onClick={handleProcessFiles}
        >
          Upload selected
        </Button>
      </ListSubheader>
      <Collapse in={isOpen} orientation={'vertical'} easing={'ease-in'} timeout={100}>
        {files.length > 0 && (
          <List
            dense={true}
            sx={{
              width: '100%',
              bgcolor: 'background.default',
              position: 'absolute',
              top: '100%',
              left: 0,
              overflowY: 'auto',
              overflowX: 'hidden',
              maxHeight: 300,
              pt: 1,
              '& ul': { padding: 0 },
              zIndex: 1000,
              boxShadow: 4,
            }}
            subheader={<li />}
          >
            {files.map((file, idx) => (
              <ListItem
                key={file.name}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleRemoveFile(file)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={idx + file.name}
                  primaryTypographyProps={{
                    sx: {
                      color: idx === 0 && state.isError ? 'red' : undefined,
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Collapse>
    </Box>
  );
}

export default UiDicomDropzone;
