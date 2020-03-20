import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TState = { isLoading: boolean };
const initialState: TState = { isLoading: false };

const _module = createSlice({
  name: '[store/ui/loading]',
  initialState: initialState,
  reducers: {
    on: (state: TState, action: PayloadAction<void>) => {
      return { ...state, isLoading: true };
    },
    off: (state: TState, action: PayloadAction<void>) => {
      return { ...state, isLoading: false };
    },
  },
});

export const loadingModule = _module;
