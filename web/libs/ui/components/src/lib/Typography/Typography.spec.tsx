import { render } from '@testing-library/react';

import Text from './Typography';

describe('Text', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Text />);
    expect(baseElement).toBeTruthy();
  });
});
