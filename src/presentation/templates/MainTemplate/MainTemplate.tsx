import React from 'react';

import styles from './MainTemplate.module.scss';

import { SidebarProvider } from '@Components/organisms/Sidebar/Sidebar.provider';

import Sidebar from '@Components/organisms/Sidebar/Sidebar.container';
import ErrorBoundary from '@Components/others/ErrorBoundary/ErrorBoundary';

const MainTemplate: React.FC<{}> = ({ children = null }) => {
  return (
    <div id={styles.root}>
      <SidebarProvider>
        {/* <ErrorBoundary>
        <Header />
      </ErrorBoundary> */}
        <div className={styles.container}>
          <ErrorBoundary>
            {/* <PageTitle /> */}
            {children}
          </ErrorBoundary>
        </div>
        <ErrorBoundary>
          <Sidebar />
        </ErrorBoundary>
      </SidebarProvider>
    </div>
  );
};

export default MainTemplate;
