import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

import styles from './SampleCard.module.scss';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import { voidFunction } from '@/library/helpers';

type TProps = {
  title?: string;
  contexts?: string;
  onAction?: () => void;
};

const SampleCard: React.FC<TProps> = ({ title = '', contexts = '', onAction = voidFunction, children = null }) => {
  return (
    <Card id={styles.container} square={true}>
      {!!title && <CardHeader title={title} />}
      <CardContent>{children}</CardContent>
      <CardContent>
        <Typography variant="body2">{contexts}</Typography>
      </CardContent>
      {!!onAction && (
        <CardActions>
          <Button onClick={onAction}>Try</Button>
        </CardActions>
      )}
    </Card>
  );
};

export default SampleCard;
