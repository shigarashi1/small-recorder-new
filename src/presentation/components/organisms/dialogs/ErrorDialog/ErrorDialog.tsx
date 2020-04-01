import React from 'react';
import Button from '@material-ui/core/Button';

import styles from './ErrorDialog.module.scss';

import BaseDialog from '../BaseDialog/BaseDialog';
import { TError } from '@/library/types';

type TProps = {
  hasOpen: boolean;
  error: TError;
  clear: () => void;
};

const ErrorDialog: React.FC<TProps> = ({ hasOpen, error, clear }) => {
  const onClose = () => {
    clear();
  };

  const buttonChildren = (
    <div className={styles.btnWrapper}>
      <Button onClick={onClose}>Close</Button>
    </div>
  );

  return (
    <div id={styles.container}>
      <BaseDialog
        hasOpened={hasOpen}
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
