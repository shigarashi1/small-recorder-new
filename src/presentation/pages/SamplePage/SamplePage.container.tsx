import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import InjectedPageComponent from './SamplePage';
import { errorActions } from '@/root/error-actions';
import { ApiError } from '@/library/models/error';

const SamplePage: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const throwError = useCallback(
    (err: ApiError) => {
      dispatch(errorActions.throwError(err.info));
    },
    [dispatch],
  );

  return <InjectedPageComponent throwError={throwError} />;
};
export default SamplePage;
