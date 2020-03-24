import React from 'react';
import Button from '@material-ui/core/Button';

import styles from './ErrorDialog.module.scss';

import BaseDialog from '../BaseDialog/BaseDialog';
import { TError } from '@/library/types';

type TProps = {
  hasOpen: boolean;
  error: TError;
  clearError: () => void;
};

const ErrorDialog: React.FC<TProps> = ({ hasOpen, error, clearError }) => {
  const onClose = () => {
    clearError();
  };

  const buttonChildren = (
    <div className={styles.btnWrapper}>
      <Button onClick={onClose}>Close</Button>
    </div>
  );

  return (
    <div id={styles.container}>
      <BaseDialog
        hasOpen={hasOpen}
        onClose={onClose}
        title={`[${error.code}] システムエラーが発生しました.`}
        areaLabeledby="dialog-error"
        buttonChildren={buttonChildren}
      >
        {error.message}
      </BaseDialog>
    </div>
  );
};

export default ErrorDialog;
