import { OptionsObject } from 'notistack';

// Lang
export const ELangCode = { Jp: 'jp', En: 'en' } as const;
export type TI18nObj = {
  [ELangCode.Jp]: string;
  [ELangCode.En]?: string;
};
export type TLangCode = typeof ELangCode[keyof typeof ELangCode];

// dialog
type TBaseDialog = {
  hasOpened: boolean;
  close?: () => void;
  title?: TI18nObj;
  contexts?: TI18nObj | TI18nObj[];
};

export type TInfoDialog = TBaseDialog & {
  ok?: () => void;
};
export type ShowInfoDialogParam = Omit<TInfoDialog, 'hasOpened'>;
export type ShowInfoDialogFn = (v: ShowInfoDialogParam) => void;

export type TOkCancelDialog = TBaseDialog & {
  ok?: () => void;
  cancel?: () => void;
};
export type ShowOkCancelDialogParam = Omit<TOkCancelDialog, 'hasOpened'>;
export type ShowOkCancelDialogFn = (v: ShowOkCancelDialogParam) => void;

export type TYesNoDialog = TBaseDialog & {
  yes?: () => void;
  no?: () => void;
};
export type ShowYesNoDialogParam = Omit<TYesNoDialog, 'hasOpened'>;
export type ShowYesNoDialogFn = (v: ShowYesNoDialogParam) => void;

// Snackbar
export type TNotifierProps = {
  id: string;
  message: string;
  hasDismissed?: boolean;
  options?: Omit<OptionsObject, 'key'>;
};
