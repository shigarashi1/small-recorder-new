import React, { ComponentProps } from 'react';
import Grid from '@material-ui/core/Grid';
import SampleCard from '@Components/molecules/SampleCard/SampleCard';
import Typography from '@material-ui/core/Typography';

import styles from './SamplePage.module.scss';
import { Logger } from '@/library/models/logger';
import { ApiError } from '@/library/models/error';
import { ActionFunction } from '@/library/redux-observable';
import { infoDialogActions } from '@Events/ui/info-dialog';

type TProps = {
  throwError: (error: ApiError) => void;
  showInfoDialog: ActionFunction<typeof infoDialogActions.show>;
};
type SampleProps = ComponentProps<typeof SampleCard>;
const getComponent = (props: TProps): SampleProps[] => [
  {
    title: 'Sample Card Sample',
    contexts: 'Sample Card Sample',
    onAction: () => {
      Logger.log('Action');
    },
    children: <p>Sample Card</p>,
  },
  {
    title: 'ErrorDialog',
    contexts: 'Show ErrorDialog',
    onAction: () => {
      props.throwError(new ApiError('E0000'));
    },
  },
  {
    title: 'InfoDialog',
    contexts: 'Show InfoDialog',
    onAction: () => {
      props.showInfoDialog({
        title: { jp: 'sample' },
        contexts: [{ jp: 'sample1' }, { jp: 'sample2sample2' }, { jp: 'sample3sample3sample3' }],
      });
    },
  },
];

const SamplePage: React.FC<TProps> = (props) => {
  const renderSample = (component: SampleProps, key: number) => {
    return (
      <Grid key={`sample-card-gird-${key}`} item={true} xs={12} sm={6} md={4} lg={3} xl={3}>
        <SampleCard {...component} />
      </Grid>
    );
  };

  return (
    <div id={styles.container}>
      <div className={styles.contents}>
        <Typography variant="h5">Samples</Typography>
        <Grid container={true} spacing={2}>
          {getComponent(props).map(renderSample)}
        </Grid>
      </div>
    </div>
  );
};

export default SamplePage;
