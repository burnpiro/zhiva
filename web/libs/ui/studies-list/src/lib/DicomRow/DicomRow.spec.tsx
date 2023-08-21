import { render } from '@testing-library/react';

import DicomRow from './DicomRow';

describe('DicomRow', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DicomRow />);
    expect(baseElement).toBeTruthy();
  });
});
