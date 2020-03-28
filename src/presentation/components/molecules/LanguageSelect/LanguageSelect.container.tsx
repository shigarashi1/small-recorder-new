import React, { useCallback, ComponentProps } from 'react';
import Comp from './LanguageSelect';
import { useSelector, useDispatch } from 'react-redux';
import { languageSelector } from '@/application/selector/ui';
import { TLangCode } from '@/presentation/types';
import { languageModule } from '@/store/ui/language';

type TProps = Omit<ComponentProps<typeof Comp>, 'langCode' | 'children' | 'changeLangCode'>;
const LanguageSelect: React.FC<TProps> = ({ isCol }) => {
  const langCode = useSelector(languageSelector.langCode);
  const dispatch = useDispatch();
  const changeLangCode = useCallback(
    (v: TLangCode) => {
      dispatch(languageModule.actions.change(v));
    },
    [dispatch],
  );
  return <Comp isCol={isCol} langCode={langCode} changeLangCode={changeLangCode} />;
};
export default LanguageSelect;
