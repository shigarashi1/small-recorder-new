import React, { ComponentProps } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import styles from './BaseDialog.module.scss';
import { TI18nObj } from '@/presentation/types';
import I18nText from '@Components/atoms/I18nText/I18nText.container';

type DialogProps = Omit<
  ComponentProps<typeof Dialog>,
  'children' | 'aria-labelledby' | 'aria-describedby' | 'open' | 'onClose' | 'title'
>;

type TProps = DialogProps & {
  hasOpened: boolean;
  onClose: () => void;
  title?: TI18nObj | string;
  areaLabeledby?: string;
  buttonChildren?: React.ReactNode;
};

// eslint-disable-next-line complexity
const BaseDialog: React.FC<TProps> = ({
  hasOpened: hasOpen,
  onClose,
  title,
  children,
  areaLabeledby = 'dialog-base',
  buttonChildren,
  fullWidth = false,
}) => {
  return (
    <Dialog
      id={styles.dialog}
      open={hasOpen}
      onClose={onClose}
      aria-labelledby={areaLabeledby}
      aria-describedby={areaLabeledby}
      fullWidth={fullWidth}
    >
      {title && (
        <DialogTitle id="dialog-title">{typeof title === 'string' ? title : <I18nText i18nObj={title} />}</DialogTitle>
      )}
      <DialogContent className={styles.content}>{children ? children : null}</DialogContent>
      {buttonChildren && <DialogActions className={styles.actions}>{buttonChildren}</DialogActions>}
    </Dialog>
  );
};

export default BaseDialog;
