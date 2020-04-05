import { actionCreatorFactory } from 'typescript-fsa';
import { ShowInfoDialogParam } from '@/presentation/types';

// actions
const ac = actionCreatorFactory('[events/ui/info-dialog]');
const actions = {
  show: ac<ShowInfoDialogParam>('show'),
  dismiss: ac<void>('dismiss'),
};

export const infoDialogActions = actions;
