declare module 'react-cornerstone-viewport';
declare module 'cornerstone-wado-image-loader';
declare module 'cornerstone-math';
declare module 'cornerstone-tools';
declare module 'hammerjs';

declare module 'dicomweb-client';
declare module 'dcmjs';
declare module 'retry';

interface PromiseWithCancel<T> extends Promise<T> {
  cancel: () => void;
}
