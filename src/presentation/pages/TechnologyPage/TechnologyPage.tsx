import React from 'react';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import I18nText from '@Components/atoms/I18nText/I18nText.container';

import styles from './TechnologyPage.module.scss';

import { DEPENDENCIES } from '@/presentation/lookups/dependency';
import { technologyPage } from './TechnologyPage.i18n';

type TProps = {
  dependencies?: typeof DEPENDENCIES;
};

const TechnologyPage: React.FC<TProps> = ({ dependencies = [] }) => {
  return (
    <div id={styles.root}>
      TechnologyPage
      <Grid container={true} spacing={2}>
        <Grid item={true} xs={12} sm={6} md={4} lg={3} xl={3}>
          <Card className={styles.card} square={true}>
            <CardHeader className={styles.header} title={<I18nText i18nObj={technologyPage.dependencies} />} />
            <CardContent className={styles.content}>
              <List component="li" className={styles.list}>
                {dependencies.map(({ name, url }, i) => (
                  <React.Fragment key={`dependency-listitem-${i}`}>
                    <Divider />
                    <ListItem className={styles.listItem} component="a" href={url} target="_blank">
                      {name}
                    </ListItem>
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default TechnologyPage;
