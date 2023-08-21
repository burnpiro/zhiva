import { render } from '@testing-library/react';

import DicomCell from './DicomCell';

describe('DicomCell', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DicomCell />);
    expect(baseElement).toBeTruthy();
  });
});
