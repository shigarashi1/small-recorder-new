import React, { ComponentProps } from 'react';
import I18nTextPlane from './I18nText';
import { TLangCode } from '@/presentation/types';

type TProps = Omit<ComponentProps<typeof I18nTextPlane>, 'langCode' | 'children'>;
const I18nText: React.FC<TProps> = ({ i18nObj }) => {
  // TODO: useSelector
  const langCode: TLangCode = 'jp';
  return <I18nTextPlane i18nObj={i18nObj} langCode={langCode} />;
};
export { I18nText };
