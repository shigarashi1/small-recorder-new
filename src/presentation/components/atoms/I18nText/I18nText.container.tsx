import React, { ComponentProps } from 'react';
import I18nTextP from './I18nText';
import { useSelector } from 'react-redux';
import { languageSelector } from '@/application/selector/ui';

type TProps = Omit<ComponentProps<typeof I18nTextP>, 'langCode' | 'children'>;
const I18nText: React.FC<TProps> = ({ i18nObj }) => {
  const langCode = useSelector(languageSelector.langCode);
  return <I18nTextP i18nObj={i18nObj} langCode={langCode} />;
};
export { I18nText };
