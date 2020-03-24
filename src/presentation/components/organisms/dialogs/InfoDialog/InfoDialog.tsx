import React from 'react';
import Button from '@material-ui/core/Button';

import styles from './InfoDialog.module.scss';

import BaseDialog from '../BaseDialog/BaseDialog';
import Typography from '@material-ui/core/Typography';
import { TInfoDialog } from '../../../../types';

const InfoDialog: React.FC<TInfoDialog> = ({ hasOpen, title, context, ok, close }) => {
  const onClose = () => {
    close();
  };

  const onOk = () => {
    if (ok) {
      ok();
    }
    onClose();
  };

  const buttonChildren = (
    <div
    // className={styles.btnWrapper}
    >
      <Button onClick={onOk} variant="contained">
        OK
      </Button>
    </div>
  );

  return (
    <div id={styles.container}>
      <BaseDialog hasOpen={hasOpen} onClose={onClose} buttonChildren={buttonChildren} title={title}>
        <React.Fragment>
          <Typography variant="h6" gutterBottom={true}>
            {context}
          </Typography>
        </React.Fragment>
      </BaseDialog>
    </div>
  );
};

export default InfoDialog;
