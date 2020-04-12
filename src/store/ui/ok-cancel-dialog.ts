import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOkCancelDialog, ShowOkCancelDialogParam } from '@/presentation/types';

type TState = TOkCancelDialog;
const initialState: TState = {
  hasOpened: false,
  close: undefined,
  title: undefined,
  contexts: undefined,
  ok: undefined,
  cancel: undefined,
};

const _module = createSlice({
  name: '[store/ui/ok-cancel-dialog]',
  initialState: initialState,
  reducers: {
    show: (state: TState, action: PayloadAction<ShowOkCancelDialogParam>) => {
      return { ...state, hasOpened: true, ...action.payload };
    },
    dismiss: (state: TState, action: PayloadAction<void>) => {
      return { ...state, ...initialState };
    },
  },
});

export const okCancelDialogModule = _module;
