import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { okCancelDialogSelector } from '@Selector/ui';

import { okCancelDialogActions } from '@Events/ui/ok-cancel-dialog';
import InjectedComponent from './OkCancelDialog';

const OkCancelDialog: React.FC<{}> = () => {
  const hasOpened = useSelector(okCancelDialogSelector.hasOpened);
  const { title, contexts, ok, cancel } = useSelector(okCancelDialogSelector.okCancelDialog);
  const dispatch = useDispatch();
  const close = useCallback(() => {
    dispatch(okCancelDialogActions.dismiss());
  }, [dispatch]);

  return (
    <InjectedComponent hasOpened={hasOpened} title={title} contexts={contexts} ok={ok} cancel={cancel} close={close} />
  );
};
export default OkCancelDialog;
