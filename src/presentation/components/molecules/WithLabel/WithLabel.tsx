import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';

import styles from './WithLabel.module.scss';

import { TI18nObj } from '../../../types';
import { I18nText } from '@Components/atoms/I18nText/I18nText.container';

type TProps = {
  label: TI18nObj;
  // isParallel?: boolean;
};

const WithLabel: React.FC<TProps> = ({ label, children }) => {
  return (
    <div id={styles.root}>
      <List className={styles.list}>
        <ListItem className={styles.label}>
          <Typography variant="body1" color="inherit">
            <I18nText i18nObj={label} />
          </Typography>
        </ListItem>
        <ListItem className={styles.text} alignItems="flex-start">
          {children}
        </ListItem>
      </List>
    </div>
  );
};

export default WithLabel;
