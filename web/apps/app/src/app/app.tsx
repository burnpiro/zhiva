import { Route, Routes, Link } from 'react-router-dom';

import { Cornerstone3dReactViewport } from '@zhiva/cornerstone3d-react-viewport';
import { DicomSelector } from './DicomSelector/DicomSelector';
import {
  FilesProvider,
  MenuProvider,
  StudiesProvider,
  SegmentationProvider,
} from '@zhiva/react-contexts';
import { useEffect, useState } from 'react';
import { initCornerstone } from '@zhiva/utils-cornerstone';
import Skeleton from '@mui/material/Skeleton';
import { ViewerContainer } from './ViewerContainer/ViewerContainer';
import { Layout } from './Layout/Layout';
import { DefaultMenuElements } from './constants/Menu';

export function App() {
  const [isCSLoaded, setIsCSLoaded] = useState(false);
  useEffect(() => {
    const loadCornerstone = async () => {
      await initCornerstone();

      setIsCSLoaded(true);
    };

    loadCornerstone();
  }, []);

  if (!isCSLoaded) {
    return <Skeleton variant={'rectangular'} width={'50%'} height={'50%'} />;
  }

  return (
    <FilesProvider>
      <StudiesProvider>
        <SegmentationProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<DicomSelector />} />
              <Route path="studies">
                <Route
                  path=":studyId"
                  element={
                    <MenuProvider
                      defaultMenu={{ menuItems: DefaultMenuElements }}
                    >
                      <ViewerContainer />
                    </MenuProvider>
                  }
                />
              </Route>
            </Route>
          </Routes>
        </SegmentationProvider>
      </StudiesProvider>
    </FilesProvider>
  );
}

export default App;
