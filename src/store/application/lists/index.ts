import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TApplicationListData, TApplicationListMeta } from '@/store/types';

type TState = { [page: string]: TApplicationListData };
const initialState: TState = {};

type TUpdatePayload = {
  page: string;
  ids: string[];
  meta: TApplicationListMeta;
};

const _module = createSlice({
  name: '[store/application/lists]',
  initialState: initialState,
  reducers: {
    update: (state: TState, action: PayloadAction<TUpdatePayload>) => {
      const { page, ids, meta } = action.payload;
      return { ...state, [page]: { ids, meta } };
    },
  },
});

export const applicationListsModule = _module;
