import { VariantType } from 'notistack';
import { useSnackbarRef } from '../SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';

const SnackbarGenerator = {
  success(msg: string) {
    this.toast(msg, 'success');
  },
  warning(msg: string) {
    this.toast(msg, 'warning');
  },
  info(msg: string) {
    this.toast(msg, 'info');
  },
  error(msg: string) {
    this.toast(msg, 'error');
  },
  toast(msg: string, variant: VariantType = 'default') {
    useSnackbarRef.enqueueSnackbar(msg, { variant });
  },
};

export default SnackbarGenerator;
