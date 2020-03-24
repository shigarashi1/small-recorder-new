import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import styles from './BaseDialog.module.scss';

type TProps = {
  hasOpen: boolean;
  onClose: () => void;
  title?: string;
  areaLabeledby?: string;
  buttonChildren?: React.ReactNode;
};

const BaseDialog: React.FC<TProps> = ({ hasOpen, onClose, title, children, areaLabeledby, buttonChildren }) => {
  return (
    <Dialog
      id={styles.dialog}
      open={hasOpen}
      onClose={onClose}
      aria-labelledby={areaLabeledby}
      aria-describedby="dialog"
    >
      {title ? <DialogTitle id="dialog-title">{title}</DialogTitle> : null}
      <DialogContent className={styles.content}>{children ? children : null}</DialogContent>
      <DialogActions className={styles.actions}>{buttonChildren ? buttonChildren : null}</DialogActions>
    </Dialog>
  );
};

BaseDialog.defaultProps = {
  areaLabeledby: 'dialog-base',
};

export default BaseDialog;
