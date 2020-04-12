import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { yesNoDialogSelector } from '@Selector/ui';

import { yesNoDialogActions } from '@Events/ui/yes-no-dialog';
import InjectedComponent from './YesNoDialog';

const YesNoDialog: React.FC<{}> = () => {
  const hasOpened = useSelector(yesNoDialogSelector.hasOpened);
  const { title, contexts, yes, no } = useSelector(yesNoDialogSelector.yesNoDialog);
  const dispatch = useDispatch();
  const close = useCallback(() => {
    dispatch(yesNoDialogActions.dismiss());
  }, [dispatch]);

  return <InjectedComponent hasOpened={hasOpened} title={title} contexts={contexts} yes={yes} no={no} close={close} />;
};
export default YesNoDialog;
