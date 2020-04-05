import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TInfoDialog, ShowInfoDialogParam } from '@/presentation/types';

type TState = TInfoDialog;
const initialState: TState = {
  hasOpened: false,
  close: undefined,
  title: undefined,
  contexts: undefined,
  ok: undefined,
};

const _module = createSlice({
  name: '[store/ui/info-dialog]',
  initialState: initialState,
  reducers: {
    show: (state: TState, action: PayloadAction<ShowInfoDialogParam>) => {
      return { ...state, hasOpened: true, ...action.payload };
    },
    dismiss: (state: TState, action: PayloadAction<void>) => {
      return { ...state, ...initialState };
    },
  },
});

export const infoDialogModule = _module;
