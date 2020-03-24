import React, { useEffect, useState, useCallback } from 'react';
import { useSnackbar, CloseReason } from 'notistack';
import { useSelector, useDispatch } from 'react-redux';

import Button from '@material-ui/core/Button';
import { notifierSelector } from '@/application/selector/ui';
import { notifierModule } from '@/store/ui/notifier';

const Notifier: React.FC<{}> = () => {
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
  const onDismiss = useCallback((id: string) => () => dismiss(id), [dismiss]);
  const [displayedIds, setDisplayedIds] = useState<string[]>([]);
  //
  useEffect(() => {
    const addDisplayed = (v: string) => setDisplayedIds([...displayedIds, v]);
    // eslint-disable-next-line complexity
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
        ...options,
        key: id,
        variant: options.variant || 'default',
        autoHideDuration: options.autoHideDuration || 2000,
        onClose: (event: React.SyntheticEvent<any> | null, reason: CloseReason) => {
          if (options.onClose) {
            options.onClose(event, reason, id);
          }
        },
        onExit: (handler: any) => {
          dismiss(id);
        },
        action: (v: string) => <Button onClick={onDismiss(id)}>OK</Button>,
      });
    });
  }, [enqueueSnackbar, closeSnackbar, notifierProps, displayedIds, dismiss, onDismiss]);

  return null;
};

export default Notifier;
