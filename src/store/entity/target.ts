import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Target } from '@DomainModels/target';
import { TEntityData } from '../types';
import { mergeAndUniqArray } from '@/library/helpers';
import { addEntityMeta } from '../helpers';

type TState = TEntityData<Target>[];
const initialState: TState = [];

const _module = createSlice({
  name: '[store/entity/targets]',
  initialState: initialState,
  reducers: {
    addData: (state: TState, action: PayloadAction<Target[]>) => {
      return mergeAndUniqArray((v) => v.data.id, state, addEntityMeta(action.payload));
    },
  },
});

export const targetsModule = _module;
