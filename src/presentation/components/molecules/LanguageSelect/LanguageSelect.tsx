import React from 'react';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import I18nText from '@Components/atoms/I18nText/I18nText.container';

import styles from './LanguageSelect.module.scss';
import { TLangCode, ELangCode } from '../../../types';
import { languageSelect } from './LanguageSelect.i18n';

type TProps = {
  langCode: TLangCode;
  changeLangCode: (v: TLangCode) => void;
  isCol?: boolean;
};

const LanguageSelect: React.FC<TProps> = ({ langCode, changeLangCode, isCol = false }) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value as TLangCode;
    changeLangCode(value);
  };

  return (
    <React.Fragment>
      <div id={styles.root}>
        <RadioGroup
          // className={styles.group}
          aria-label="language-select"
          name="language-select"
          value={langCode}
          onChange={onChange}
          row={!isCol}
        >
          <FormControlLabel
            className={styles.label}
            value={ELangCode.Jp}
            control={<Radio color="secondary" />}
            label={<I18nText i18nObj={languageSelect.japanese} />}
            labelPlacement="end"
          />
          <FormControlLabel
            className={styles.label}
            value={ELangCode.En}
            control={<Radio color="secondary" />}
            label={<I18nText i18nObj={languageSelect.english} />}
            labelPlacement="end"
          />
        </RadioGroup>
      </div>
    </React.Fragment>
  );
};

export default LanguageSelect;
