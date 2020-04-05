import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TErrorPartial } from '@/library/types';

type TState = TErrorPartial & {
  hasOpened: boolean;
};
const initialState: TState = {
  hasOpened: false,
  code: undefined,
  errorCode: undefined,
  message: undefined,
  stack: undefined,
  params: [],
};

const _module = createSlice({
  name: '[store/ui/error-dialog]',
  initialState: initialState,
  reducers: {
    show: (state: TState, action: PayloadAction<Omit<TState, 'hasOpened'>>) => {
      return { ...state, hasOpened: true, ...action.payload };
    },
    dismiss: (state: TState, action: PayloadAction<void>) => {
      return { ...state, ...initialState };
    },
  },
});

export const errorDialogModule = _module;
