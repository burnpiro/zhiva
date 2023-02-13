import { render } from '@testing-library/react';

import ToolButton from './ToolButton';

describe('ToolButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ToolButton />);
    expect(baseElement).toBeTruthy();
  });
});
