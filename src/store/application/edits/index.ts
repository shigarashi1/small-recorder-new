import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TApplicationEditData, TApplicationEditMeta } from '@/store/types';

type TState = { [page: string]: TApplicationEditData };
const initialState: TState = {};

type TUpdatePayload = {
  page: string;
  id: string;
  meta: TApplicationEditMeta;
};

const _module = createSlice({
  name: '[store/application/edits]',
  initialState: initialState,
  reducers: {
    update: (state: TState, action: PayloadAction<TUpdatePayload>) => {
      const { page, id, meta } = action.payload;
      return { ...state, [page]: { id, meta } };
    },
  },
});

export const applicationEditsModule = _module;
