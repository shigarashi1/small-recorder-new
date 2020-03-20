import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/domain/models/user';
import { TEntityData } from '../types';
import { mergeAndUniqArray } from '@/library/helpers';
import { addEntityMeta } from '../helpers';

type TState = TEntityData<User>[];
const initialState: TState = [];

const _module = createSlice({
  name: '[store/entity/users]',
  initialState: initialState,
  reducers: {
    addData: (state: TState, action: PayloadAction<User[]>) => {
      return mergeAndUniqArray((v) => v.data.id, state, addEntityMeta(action.payload));
    },
  },
});

export const usersModule = _module;
