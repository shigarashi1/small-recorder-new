/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useCallback } from 'react';
import { useSnackbar, CloseReason, OptionsObject } from 'notistack';
import { useSelector, useDispatch } from 'react-redux';

import Button from '@material-ui/core/Button';
import { notifierSelector } from '@Selector/ui';
import { notifierModule } from '@/store/ui/notifier';

const addDefaultOptions = (dismiss: (v: string) => void, id: string, options?: OptionsObject): OptionsObject => ({
  ...options,
  key: id,
  variant: options?.variant || 'default',
  autoHideDuration: options?.autoHideDuration || 2000,
  onClose: (event: React.SyntheticEvent<any> | null, reason: CloseReason) => {
    if (options?.onClose) {
      options.onClose(event, reason, id);
    }
  },
  onExit: (handler: any) => {
    dismiss(id);
  },
});

const Notifier: React.FC<{}> = () => {
  const [displayedIds, setDisplayedIds] = useState<string[]>([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  //
  const notifierProps = useSelector(notifierSelector.notifierProps);
  const dispatch = useDispatch();
  const dismiss = useCallback(
    (id: string) => {
      dispatch(notifierModule.actions.dismiss(id));
    },
    [dispatch],
  );
  //
  const addDisplayed = useCallback((v: string) => setDisplayedIds([...displayedIds, v]), [displayedIds]);
  const onDismiss = useCallback((id: string) => () => dismiss(id), [dismiss]);
  //
  useEffect(() => {
    notifierProps.forEach(({ id, message, options = {}, hasDismissed = false }) => {
      if (hasDismissed) {
        closeSnackbar(id);
        return;
      }

      // Do nothing if snackbar is already displayed
      if (displayedIds.includes(id)) {
        return;
      }

      // Keep track of snackbars that we've displayed
      addDisplayed(id);

      // Display snackbar using notistack
      enqueueSnackbar(message, {
        ...addDefaultOptions(dismiss, id, options),
        action: (v: string) => <Button onClick={onDismiss(v)}>OK</Button>,
      });
    });
  }, [enqueueSnackbar, closeSnackbar, notifierProps, displayedIds, dismiss, onDismiss, addDisplayed]);

  return null;
};

export default Notifier;
