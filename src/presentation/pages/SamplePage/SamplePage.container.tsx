import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import InjectedPageComponent from './SamplePage';
import { errorActions } from '@/root/error-actions';
import { ApiError } from '@/library/models/error';
import { infoDialogActions } from '@Events/ui/info-dialog';
import { ActionParameters } from '@/library/redux-observable';

const SamplePage: React.FC<{}> = () => {
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

  return <InjectedPageComponent throwError={throwError} showInfoDialog={showInfoDialog} />;
};
export default SamplePage;
