import React from 'react';
import Button from '@material-ui/core/Button';

import styles from './ErrorDialog.module.scss';

import BaseDialog from '../BaseDialog/BaseDialog';
import { errorDialogText } from './ErrorDialog.i18n';

type TProps = {
  hasOpened: boolean;
  code: string;
  message: string;
  clear: () => void;
};

const ErrorDialog: React.FC<TProps> = ({ hasOpened, code = '', message = '', clear }) => {
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
        hasOpened={hasOpened}
        onClose={onClose}
        title={errorDialogText.title}
        areaLabeledby="dialog-error"
        buttonChildren={buttonChildren}
      >
        {`${message}(${code})`}
      </BaseDialog>
    </div>
  );
};

export default ErrorDialog;
