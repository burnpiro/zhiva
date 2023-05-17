import { default as MUIDialog } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { isMobile, useDevice } from 'use-ua-parser-js';
import Button from '../Button/Button';
import { ReactNode } from 'react';

/* eslint-disable-next-line */
export interface DialogProps {
  /**
   * The content of the component.
   */
  children?: ReactNode;
  /**
   * If `true`, displays the dialog.
   * @default false
   */
  isOpen: boolean;
  /**
   * If `true`, displays actions at the bottom of the drawer
   * @default true
   */
  showActions?: boolean;
  /**
   * Title of the dialog
   */
  title?: string;
  /**
   * Title of the Close button in dialog's actions
   * @default 'Close'
   */
  closeMessage?: string;
  /**
   * Function called when user closes the dialog (either using Close button or clicking outside)
   */
  onClose?: () => void;
  /**
   * Title of the Submit button is dialog's actions
   * @default 'Submit'
   */
  submitMessage?: string;
  /**
   * If 'true' then Submit action is enabled
   * @default true
   */
  submitEnabled?: boolean;
  /**
   * Function called when user clicks on the "Submit" action
   */
  onSubmit?: () => void;
  /**
   * Determines size of the dialog
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /**
   * If 'true' then Dialog will cover whole screen (this is ignored on mobile devices)
   * @default false
   */
  fullScreen?: boolean;
}

export function Dialog({
  isOpen,
  onClose,
  onSubmit,
  children,
  title,
  fullScreen,
  showActions = true,
  closeMessage = 'Cancel',
  submitMessage = 'Submit',
  submitEnabled = true,
  size = 'md',
}: DialogProps) {
  const isMobileDevice = isMobile(useDevice());
  return (
    <MUIDialog
      fullScreen={isMobileDevice || fullScreen}
      open={isOpen}
      fullWidth
      maxWidth={size}
      onClose={onClose}
    >
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent
        style={{
          paddingRight: isMobileDevice ? 0 : 'initial',
          paddingLeft: isMobileDevice ? 0 : 'initial',
        }}
      >
        {children}
      </DialogContent>
      {showActions && (
        <DialogActions>
          <Button onClick={onClose} color={'error'}>
            {closeMessage}
          </Button>
          {onSubmit && (
            <Button
              fullWidth={false}
              disabled={!submitEnabled}
              onClick={onSubmit}
              variant={'contained'}
            >
              {submitMessage}
            </Button>
          )}
        </DialogActions>
      )}
    </MUIDialog>
  );
}

export default Dialog;
