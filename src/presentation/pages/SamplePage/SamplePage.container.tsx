import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import InjectedPageComponent from './SamplePage';
import { errorActions } from '@/root/error-actions';
import { ApiError } from '@/library/models/error';
import { infoDialogActions } from '@Events/ui/info-dialog';
import { ActionParameters } from '@/library/redux-observable';
import { okCancelDialogActions } from '@Events/ui/ok-cancel-dialog';
import { yesNoDialogActions } from '@Events/ui/yes-no-dialog';
import { languageSelector } from '@Selector/ui';

const SamplePage: React.FC<{}> = () => {
  const langCode = useSelector(languageSelector.langCode);
  const dispatch = useDispatch();
  const throwError = useCallback(
    (err: ApiError) => {
      dispatch(errorActions.throwError(err.info));
    },
    [dispatch],
  );
  const showInfoDialog = useCallback(
    (v: ActionParameters<typeof infoDialogActions.show>) => {
      dispatch(infoDialogActions.show(v));
    },
    [dispatch],
  );
  const showOkCancelDialog = useCallback(
    (v: ActionParameters<typeof okCancelDialogActions.show>) => {
      dispatch(okCancelDialogActions.show(v));
    },
    [dispatch],
  );
  const showYesNoDialog = useCallback(
    (v: ActionParameters<typeof yesNoDialogActions.show>) => {
      dispatch(yesNoDialogActions.show(v));
    },
    [dispatch],
  );

  return (
    <InjectedPageComponent
      langCode={langCode}
      throwError={throwError}
      showInfoDialog={showInfoDialog}
      showOkCancelDialog={showOkCancelDialog}
      showYesNoDialog={showYesNoDialog}
    />
  );
};
export default SamplePage;
