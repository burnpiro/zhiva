import { useRef } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Drawer } from './Drawer';

export default {
  component: Drawer,
  title: 'UI_ELEMENTS/Drawer',
  args: {
    showDrawer: false,
    position: 'left',
  },

  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Drawer>;

const Template: ComponentStory<typeof Drawer> = (args) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { current } = containerRef;

  return (
    <div
      style={{
        height: '500px',
        minHeight: '100%',
        width: '100%',
        backgroundColor: 'grey',
        textAlign: 'center',
        marginTop: 40,
      }}
      ref={containerRef}
    >
      Container
      <Drawer {...args} containerRef={containerRef}>
        Some Data
      </Drawer>
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {};
