import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { infoDialogSelector } from '@Selector/ui';

import { infoDialogActions } from '@Events/ui/info-dialog';
import InjectedComponent from './InfoDialog';

const InfoDialog: React.FC<{}> = () => {
  const hasOpened = useSelector(infoDialogSelector.hasOpened);
  const { title, contexts, ok } = useSelector(infoDialogSelector.infoDialog);
  const dispatch = useDispatch();
  const close = useCallback(() => {
    dispatch(infoDialogActions.dismiss());
  }, [dispatch]);

  return <InjectedComponent hasOpened={hasOpened} title={title} contexts={contexts} ok={ok} close={close} />;
};
export default InfoDialog;
