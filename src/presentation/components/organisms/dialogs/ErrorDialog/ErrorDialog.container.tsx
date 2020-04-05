import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { errorDialogSelector, languageSelector } from '@Selector/ui';

import InjectedComponent from './ErrorDialog';
import { errorActions } from '@/root/error-actions';
import { ERROR_MESSAGE } from '@/presentation/i18n/message';
import { getText } from '@/presentation/i18n';

// eslint-disable-next-line complexity
const ErrorDialog: React.FC<{}> = () => {
  const hasOpened = useSelector(errorDialogSelector.hasOpened);
  const langCode = useSelector(languageSelector.langCode);
  const errorInfo = useSelector(errorDialogSelector.errorInfo);
  const dispatch = useDispatch();
  const clear = useCallback(() => {
    dispatch(errorActions.clearError());
  }, [dispatch]);

  const code = errorInfo.errorCode || errorInfo.code || 'unknown';
  const message = errorInfo.errorCode
    ? getText(ERROR_MESSAGE[errorInfo.errorCode], langCode)
    : errorInfo.message || 'unknown error.';

  return <InjectedComponent hasOpened={hasOpened} code={code} message={message} clear={clear} />;
};
export default ErrorDialog;
