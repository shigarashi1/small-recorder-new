import React from 'react';
import Button from '@material-ui/core/Button';

import styles from './InfoDialog.module.scss';

import BaseDialog from '../BaseDialog/BaseDialog';
import Typography from '@material-ui/core/Typography';
import { TInfoDialog } from '../../../../types';
import { infoDialogDefaultText } from './InfoDialog.i18n';
import { voidFunction, toArray } from '@/library/helpers';
import I18nText from '@Components/atoms/I18nText/I18nText.container';

type TProps = TInfoDialog;
const InfoDialog: React.FC<TProps> = ({
  hasOpened,
  title = infoDialogDefaultText.title,
  contexts = infoDialogDefaultText.contexts,
  ok = voidFunction,
  close = voidFunction,
}) => {
  const onClose = () => {
    close();
  };

  const onOk = () => {
    ok();
    onClose();
  };

  const buttonChildren = (
    <div>
      <Button onClick={onOk} variant="contained">
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
        areaLabeledby="info-dialog"
      >
        {toArray(contexts).map((context, index) => (
          <Typography key={`info-dialog-contexts-${index}`} variant="h6" gutterBottom={true}>
            <I18nText i18nObj={context} />
          </Typography>
        ))}
      </BaseDialog>
    </div>
  );
};

export default InfoDialog;
