import nanoid from 'nanoid';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TNotifierProps } from '@/presentation/types';

type TState = TNotifierProps[];
const initialState: TState = [];

const _module = createSlice({
  name: '[store/ui/notifier]',
  initialState: initialState,
  reducers: {
    enqueue: (state: TState, action: PayloadAction<Omit<TNotifierProps, 'id' | 'hasDismissed'>>) => {
      return [...state, { ...action.payload, id: nanoid() }];
    },
    dismiss: (state: TState, action: PayloadAction<string>) => {
      return state.map((v) => (v.id !== action.payload ? v : { ...v, hasDismissed: true }));
    },
  },
});

export const notifierModule = _module;
