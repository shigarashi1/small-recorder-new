import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import styles from './OkCancelDialog.module.scss';

import BaseDialog from '../BaseDialog/BaseDialog';
import { TOkCancelDialog } from '../../../../types';
import { voidFunction, toArray } from '@/library/helpers';
import { okCancelDialogDefaultText } from './OkCancelDialog.i18n';
import I18nText from '@Components/atoms/I18nText/I18nText.container';

type TProps = TOkCancelDialog;
const OkCancelDialog: React.FC<TOkCancelDialog> = ({
  hasOpened,
  close = voidFunction,
  title = okCancelDialogDefaultText.title,
  contexts = okCancelDialogDefaultText.contexts,
  ok = voidFunction,
  cancel = voidFunction,
}) => {
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
        hasOpened={hasOpened}
        onClose={onClose}
        buttonChildren={buttonChildren}
        title={title}
        areaLabeledby="ok-cancel-dialog"
      >
        {toArray(contexts).map((context, index) => (
          <Typography key={`ok-cancel-dialog-contexts-${index}`} variant="h6" gutterBottom={true}>
            <I18nText i18nObj={context} />
          </Typography>
        ))}
      </BaseDialog>
    </div>
  );
};

export default OkCancelDialog;
