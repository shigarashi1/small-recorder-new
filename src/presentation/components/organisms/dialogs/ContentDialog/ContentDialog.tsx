import React from 'react';
import Button from '@material-ui/core/Button';

import styles from './ContentDialog.module.scss';

import BaseDialog from '../BaseDialog/BaseDialog';
import { TI18nObj } from '@/presentation/types';

type TProps = {
  title: string | TI18nObj;
  hasOpened: boolean;
  close: () => void;
};

const ContentDialog: React.FC<TProps> = ({ hasOpened, close, title, children = null }) => {
  const onClose = () => {
    close();
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
        title={title}
        areaLabeledby="dialog-error"
        buttonChildren={buttonChildren}
        fullWidth={true}
      >
        {children}
      </BaseDialog>
    </div>
  );
};

export default ContentDialog;
