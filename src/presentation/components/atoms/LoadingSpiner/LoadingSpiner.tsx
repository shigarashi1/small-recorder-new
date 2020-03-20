import React from 'react';
import { CircularProgress } from '@material-ui/core';

import styles from './LoadingSpiner.module.scss';

type TProps = {
  isLoading: boolean;
};

const LoadingSpiner: React.FC<TProps> = ({ isLoading, children }) => {
  return (
    <React.Fragment>
      {isLoading && (
        <div id={styles.container}>
          <CircularProgress className={styles.progress} />
        </div>
      )}
      {children}
    </React.Fragment>
  );
};

export default LoadingSpiner;
