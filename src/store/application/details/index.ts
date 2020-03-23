import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TApplicationDetailData, TApplicationDetailMeta } from '@/store/types';

type TState = { [page: string]: TApplicationDetailData };
const initialState: TState = {};

type TUpdatePayload = {
  page: string;
  id: string;
  meta: TApplicationDetailMeta;
};

const _module = createSlice({
  name: '[store/application/details]',
  initialState: initialState,
  reducers: {
    update: (state: TState, action: PayloadAction<TUpdatePayload>) => {
      const { page, id, meta } = action.payload;
      return { ...state, [page]: { id, meta } };
    },
  },
});

export const applicationDetailsModule = _module;
