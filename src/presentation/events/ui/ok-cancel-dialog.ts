import { actionCreatorFactory } from 'typescript-fsa';
import { ShowOkCancelDialogParam } from '@/presentation/types';

// actions
const ac = actionCreatorFactory('[events/ui/ok-cancel-dialog]');
const actions = {
  show: ac<ShowOkCancelDialogParam>('show'),
  dismiss: ac<void>('dismiss'),
};

export const okCancelDialogActions = actions;
