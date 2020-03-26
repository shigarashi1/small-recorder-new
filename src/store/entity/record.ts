import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Record } from '@DomainModels/record';
import { TEntityData } from '../types';
import { mergeAndUniqArray } from '@/library/helpers';
import { addEntityMeta } from '../helpers';

type TState = TEntityData<Record>[];
const initialState: TState = [];

const _module = createSlice({
  name: '[store/entity/records]',
  initialState: initialState,
  reducers: {
    addData: (state: TState, action: PayloadAction<Record[]>) => {
      return mergeAndUniqArray((v) => v.data.id, state, addEntityMeta(action.payload));
    },
  },
});

export const recordsModule = _module;
