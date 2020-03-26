import React from 'react';

import styles from './SamplePage.module.scss';

type TProps = {};

const SamplePage: React.FC<TProps> = () => {
  return <div className={styles.root}>SamplePage</div>;
};

export default SamplePage;
