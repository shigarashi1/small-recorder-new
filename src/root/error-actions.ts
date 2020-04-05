import { actionCreatorFactory } from 'typescript-fsa';
import { TErrorPartial } from '@/library/types';

// actions
const ac = actionCreatorFactory('[store/root/error]');
const actions = {
  throwError: ac<TErrorPartial>('throwError'),
  clearError: ac<void>('clearError'),
};

export const errorActions = actions;
