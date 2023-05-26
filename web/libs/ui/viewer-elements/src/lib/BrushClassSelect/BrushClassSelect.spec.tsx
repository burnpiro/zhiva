import { render } from '@testing-library/react';

import BrushClassSelect from './BrushClassSelect';

describe('BrushClassSelect', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BrushClassSelect />);
    expect(baseElement).toBeTruthy();
  });
});
