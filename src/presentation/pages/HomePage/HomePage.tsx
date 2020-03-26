import React from 'react';

import styles from './HomePage.module.scss';
import { Link } from 'react-router-dom';
import { EPath } from '@/presentation/lookups/router';
import { Button } from '@material-ui/core';

type TProps = {};

const HomePage: React.FC<TProps> = () => {
  return (
    <>
      <div className={styles.root}>HomePage</div>
      <Link to={EPath.MyRecord}>
        <Button>Record</Button>
      </Link>
      <Link to={EPath.MyReport}>
        <Button>Report</Button>
      </Link>
      <Link to={EPath.MySearch}>
        <Button>Search</Button>
      </Link>
      <Link to={EPath.MySetting}>
        <Button>Setting</Button>
      </Link>
    </>
  );
};

export default HomePage;
