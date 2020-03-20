import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '@/domain/models/category';
import { TEntityData } from '../types';
import { mergeAndUniqArray } from '@/library/helpers';
import { addEntityMeta } from '../helpers';

type TState = TEntityData<Category>[];
const initialState: TState = [];

const _module = createSlice({
  name: '[store/entity/categories]',
  initialState: initialState,
  reducers: {
    addData: (state: TState, action: PayloadAction<Category[]>) => {
      return mergeAndUniqArray((v) => v.data.id, state, addEntityMeta(action.payload));
    },
  },
});

export const categoriesModule = _module;
