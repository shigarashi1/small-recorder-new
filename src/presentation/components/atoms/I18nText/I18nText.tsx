import React from 'react';

import { TI18nObj, TLangCode } from '../../../types';
import { getText } from '../../../i18n';

type TProps = {
  langCode: TLangCode;
  i18nObj: TI18nObj | undefined;
};

const INITIAL: TI18nObj = {
  jp: '未登録',
  en: 'undefined',
};

const I18nText: React.FC<TProps> = ({ langCode, i18nObj = INITIAL }) => {
  return <React.Fragment>{getText(langCode, i18nObj)}</React.Fragment>;
};

export default I18nText;
