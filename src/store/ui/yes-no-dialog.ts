import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TYesNoDialog, ShowYesNoDialogParam } from '@/presentation/types';

type TState = TYesNoDialog;
const initialState: TState = {
  hasOpened: false,
  close: undefined,
  title: undefined,
  contexts: undefined,
  yes: undefined,
  no: undefined,
};

const _module = createSlice({
  name: '[store/ui/yes-no-dialog]',
  initialState: initialState,
  reducers: {
    show: (state: TState, action: PayloadAction<ShowYesNoDialogParam>) => {
      return { ...state, hasOpened: true, ...action.payload };
    },
    dismiss: (state: TState, action: PayloadAction<void>) => {
      return { ...state, ...initialState };
    },
  },
});

export const yesNoDialogModule = _module;
