import { TI18nObj, TLangCode } from '../types';

export const getText = (resource: TI18nObj, langCode: TLangCode): string => resource?.[langCode] || resource.jp;
