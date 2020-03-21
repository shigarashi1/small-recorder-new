export const ELangCode = { Jp: 'jp', En: 'en' } as const;
export type TI18nObj = {
  [ELangCode.Jp]: string;
  [ELangCode.En]?: string;
};
export type TLangCode = typeof ELangCode[keyof typeof ELangCode];
