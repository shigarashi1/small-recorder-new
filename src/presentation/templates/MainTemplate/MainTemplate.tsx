import React from 'react';

import styles from './MainTemplate.module.scss';

import ErrorBoundary from '@Components/others/ErrorBoundary/ErrorBoundary';

const MainTemplate: React.FC<{}> = ({ children = null }) => {
  return (
    <div id={styles.root}>
      {/* <ErrorBoundary>
        <Header />
      </ErrorBoundary> */}
      <div className={styles.container}>
        <ErrorBoundary>
          {/* <PageTitle /> */}
          {children}
        </ErrorBoundary>
      </div>
      {/* <ErrorBoundary>
        <Sidebar />
      </ErrorBoundary> */}
    </div>
  );
};

export default MainTemplate;
