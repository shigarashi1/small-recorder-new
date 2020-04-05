import React from 'react';
import Button from '@material-ui/core/Button';

import styles from './YesNoDialog.module.scss';

import BaseDialog from '../BaseDialog/BaseDialog';
import { TYesNoDialog } from '../../../../types';
import { yesNoDialogDefaultText } from './YesNoDialog.i18n';
import { voidFunction, toArray } from '@/library/helpers';
import I18nText from '@Components/atoms/I18nText/I18nText.container';

type TProps = TYesNoDialog;
const YesNoDialog: React.FC<TProps> = ({
  hasOpened,
  title = yesNoDialogDefaultText.title,
  contexts = yesNoDialogDefaultText.contexts,
  close = voidFunction,
  yes = voidFunction,
  no = voidFunction,
}) => {
  const onClose = () => {
    close();
  };

  const onSelectYes = () => {
    yes();
    close();
  };

  const onSelectNo = () => {
    no();
    close();
  };

  const buttonChildren = (
    <div className={styles.btnWrapper}>
      <Button onClick={onSelectNo} variant="contained" color="secondary">
        No
      </Button>
      <Button onClick={onSelectYes} variant="contained" color="primary">
        Yes
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
        areaLabeledby="dialog-selection"
      >
        {toArray(contexts).map((context, index) => (
          <I18nText key={`ok-cancel-dialog-contexts-${index}`} i18nObj={context} />
        ))}
      </BaseDialog>
    </div>
  );
};

export default YesNoDialog;
