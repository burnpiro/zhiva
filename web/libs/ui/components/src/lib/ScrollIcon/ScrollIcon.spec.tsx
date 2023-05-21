import { render } from '@testing-library/react';

import ScrollIcon from './ScrollIcon';

describe('ScrollIcon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ScrollIcon />);
    expect(baseElement).toBeTruthy();
  });
});
