import React, {
  createContext,
  useReducer,
  Dispatch,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { SegmentationService } from '@zhiva/services';
import { InstanceUIDs } from '@zhiva/types';
const SegmentationContext = createContext<{
  segmentationServices: Record<
    InstanceUIDs['StudyInstanceUID'],
    SegmentationService
  >;
  initializeSegService: (studyUID: InstanceUIDs['StudyInstanceUID']) => void;
}>({
  segmentationServices: {},
  initializeSegService: () => {},
});

const SegmentationProvider = ({ children }: { children: ReactNode }) => {
  const [segmentationServices, setSegmentationServices] = useState<
    Record<InstanceUIDs['StudyInstanceUID'], SegmentationService>
  >({});

  const initializeSegService = (studyUID: InstanceUIDs['StudyInstanceUID']) => {
    if (!segmentationServices[studyUID]) {
      setSegmentationServices({
        ...segmentationServices,
        [studyUID]: new SegmentationService(),
      });
    }
  };

  return (
    <SegmentationContext.Provider
      value={{ segmentationServices, initializeSegService }}
    >
      {children}
    </SegmentationContext.Provider>
  );
};

export { SegmentationProvider, SegmentationContext };
