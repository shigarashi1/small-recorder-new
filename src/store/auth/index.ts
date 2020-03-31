import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TEntityData } from '../types';
import { PickedFirebaseUser } from '@/library/firebase/auth';

type TData = PickedFirebaseUser & {
  isLoggedIn: boolean;
  loggedUserId: string;
  username: string;
};
type TState = TEntityData<TData>;

const initialData: TData = {
  isLoggedIn: true,
  loggedUserId: '',
  uid: '',
  emailVerified: false,
  isAnonymous: true,
  photoURL: '',
  email: '',
  username: '',
};

const initialState: TState = {
  data: {
    ...initialData,
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
