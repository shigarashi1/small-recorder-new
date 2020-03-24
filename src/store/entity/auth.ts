import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TEntityData } from '../types';
import { PickedFirebaseUser } from '@/library/firebase/auth';

type TData = PickedFirebaseUser & {
  isLoggedIn: boolean;
  loggedUserId: string;
};

type TState = TEntityData<TData>;
const initialState: TState = {
  data: {
    isLoggedIn: false,
    loggedUserId: '',
    uid: '',
    emailVerified: false,
    isAnonymous: true,
    photoURL: '',
    email: '',
  },
  meta: {
    updatedAt: new Date(),
  },
};

const _module = createSlice({
  name: '[store/entity/auth]',
  initialState: initialState,
  reducers: {
    setFirebaseUser: (state: TState, action: PayloadAction<Omit<TData, 'isLoggedIn'>>) => {
      return { ...state, data: { ...action.payload, isLoggedIn: true }, meta: { updatedAt: new Date() } };
    },
  },
});

export const authModule = _module;
