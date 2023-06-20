import React, {
  createContext,
  useReducer,
  Dispatch,
  ReactNode,
  useEffect,
  useState,
  useContext,
} from 'react';
import { parseFilesToStudies } from '@zhiva/utils-cornerstone';
import { StudiesList } from '@zhiva/utils';
import { FilesContext } from '@zhiva/react-contexts';

const StudiesContext = createContext<{
  studies: StudiesList;
}>({
  studies: new Map(),
});

const StudiesProvider = ({ children }: { children: ReactNode }) => {
  const {
    state: { loadedFiles },
  } = useContext(FilesContext);
  const [studies, setStudies] = useState<StudiesList>(new Map());

  useEffect(() => {
    setStudies(parseFilesToStudies(loadedFiles));
  }, [loadedFiles.size]);

  return (
    <StudiesContext.Provider value={{ studies }}>
      {children}
    </StudiesContext.Provider>
  );
};

export { StudiesProvider, StudiesContext };
