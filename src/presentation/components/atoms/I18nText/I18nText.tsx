import React, { useCallback } from 'react';
import partial from 'ramda/es/partial';

import { TI18nObj, TLangCode } from '@/presentation/types';
import { getText } from '@/presentation/i18n';

type TProps = {
  langCode: TLangCode;
  i18nObj?: TI18nObj;
};

const INITIAL: TI18nObj = {
  jp: '未登録',
  en: 'undefined',
};

const I18nText: React.FC<TProps> = ({ langCode, i18nObj = INITIAL }) => {
  const _getText = useCallback(partial(getText, [i18nObj]), [i18nObj]);
  return <React.Fragment>{_getText(langCode)}</React.Fragment>;
};

export default I18nText;
