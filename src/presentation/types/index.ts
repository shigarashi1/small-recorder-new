// Lang
export const ELangCode = { Jp: 'jp', En: 'en' } as const;
export type TI18nObj = {
  [ELangCode.Jp]: string;
  [ELangCode.En]?: string;
};
export type TLangCode = typeof ELangCode[keyof typeof ELangCode];

// dialog
type TBaseDialog = {
  hasOpen: boolean;
  close: () => void;
  title: string;
  context: string;
};

export type TInfoDialog = TBaseDialog & {
  lists?: string[];
  ok?: () => void;
};
export type TOkCancelDialog = TBaseDialog & {
  ok: () => void;
  cancel: () => void;
};
export type TYesNoDialog = TBaseDialog & {
  yes: () => void;
  no: () => void;
};
