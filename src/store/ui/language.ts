import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TLangCode, ELangCode } from '@/presentation/types';

type TState = { langCode: TLangCode };
const initialState: TState = { langCode: ELangCode.Jp };

const _module = createSlice({
  name: '[store/ui/language]',
  initialState: initialState,
  reducers: {
    change: (state: TState, action: PayloadAction<TLangCode>) => {
      return { ...state, langCode: action.payload };
    },
  },
});

export const languageModule = _module;
