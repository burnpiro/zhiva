import { ComponentStory, Meta } from '@storybook/react';
import { Button } from '@zhiva/ui-components';
import { SnackbarGenerator } from './SnackbarGenerator/SnackbarGenerator';
import { useSnackbar, VariantType } from 'notistack';

type SnackbarProps = {
  message: string;
  variant?: VariantType;
  preventDuplicate?: boolean;
  persist?: boolean;
};

const SnackbarComponent = ({
  message,
  variant,
  preventDuplicate,
  persist,
}: SnackbarProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = () => {
    enqueueSnackbar(message, { variant, preventDuplicate, persist });
  };

  return <Button onClick={handleClick}>Show Snackbar</Button>;
};

export default {
  // component: SnackbarComponent,
  title: 'UTILS/Snackbar',
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error', 'default'],
    },
    message: { control: 'text' },
  },
  args: {
    message: 'Test snack message',
  },
} as Meta;

const HookTemplate: ComponentStory<typeof SnackbarComponent> = (
  args: SnackbarProps
) => {
  return <SnackbarComponent {...args} />;
};

export const Hook = HookTemplate.bind({});
Hook.storyName = 'Using React Hook';
Hook.args = {
  variant: 'info',
};
Hook.argTypes = {
  preventDuplicate: { control: 'boolean' },
  persist: { control: 'boolean' },
};
Hook.parameters = {
  docs: {
    source: {
      code: `
import { useSnackbar } from '@zhiva/snackbar';

const MyComponent = ({ message, variant, preventDuplicate, persist }) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = () => {
    enqueueSnackbar(message, { variant, preventDuplicate, persist });
  };

  return <ZhivaButton onClick={handleClick}>Show Snackbar</ZhivaButton>;
}
        `,
    },
  },
};

const SnackbarService = ({ message, variant }: SnackbarProps) => {
  const handleClick = () => {
    SnackbarGenerator.toast(message, variant);
  };

  return <Button onClick={handleClick}>Show Snackbar</Button>;
};

const ServiceTemplate: ComponentStory<typeof SnackbarService> = (
  args: SnackbarProps
) => {
  return <SnackbarService {...args} />;
};

export const Service = ServiceTemplate.bind({});
Service.storyName = 'Using SnackbarGenerator';
Service.args = {
  variant: 'info',
};
Service.parameters = {
  docs: {
    source: {
      code: `
import { SnackbarGenerator } from '@zhiva/snackbar';

class MyService {
  // Your class code

  displaySnackbar(message, variant) {
    SnackbarGenerator.toast(message, variant);
  }
}
        `,
    },
  },
};
