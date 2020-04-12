import { actionCreatorFactory } from 'typescript-fsa';
import { ShowYesNoDialogParam } from '@/presentation/types';

// actions
const ac = actionCreatorFactory('[events/ui/yes-no-dialog]');
const actions = {
  show: ac<ShowYesNoDialogParam>('show'),
  dismiss: ac<void>('dismiss'),
};

export const yesNoDialogActions = actions;
