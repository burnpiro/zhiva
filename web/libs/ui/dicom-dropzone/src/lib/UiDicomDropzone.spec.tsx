import { render } from '@testing-library/react';

import UiDicomDropzone from './UiDicomDropzone';

describe('UiDicomDropzone', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiDicomDropzone />);
    expect(baseElement).toBeTruthy();
  });
});
