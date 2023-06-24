import { render } from '@testing-library/react';

import MouseClickedIcon from './MouseClickedIcon';

describe('MouseClickedIcon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MouseClickedIcon />);
    expect(baseElement).toBeTruthy();
  });
});
