import React from 'react';
import Button from '@material-ui/core/Button';

import styles from './OkCancelDialog.module.scss';

import BaseDialog from '../BaseDialog/BaseDialog';
import { TOkCancelDialog } from '../../../../types';

const OkCancelDialog: React.FC<TOkCancelDialog> = ({ hasOpen, close, title, context, ok, cancel }) => {
  const onOk = () => {
    ok();
    close();
  };

  const onCancel = () => {
    cancel();
    close();
  };

  const onClose = () => {
    close();
  };

  const buttonChildren = (
    <div className={styles.btnWrapper}>
      <Button onClick={onCancel} variant="contained" color="secondary">
        Cancel
      </Button>
      <Button onClick={onOk} variant="contained" color="primary">
        OK
      </Button>
    </div>
  );

  return (
    <div id={styles.container}>
      <BaseDialog
        hasOpen={hasOpen}
        onClose={onClose}
        buttonChildren={buttonChildren}
        title={title}
        areaLabeledby="dialog-ok-cancel"
      >
        <p>{context}</p>
      </BaseDialog>
    </div>
  );
};

export default OkCancelDialog;
