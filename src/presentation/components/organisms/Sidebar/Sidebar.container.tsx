import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { authSelector } from '@/application/selector/entity/auth';
import { SIDEBAR_ROUTER_CONFIG } from '@/presentation/lookups/router';

import InjectedComponent from './Sidebar';
import { SidebarContext } from './Sidebar.provider';

const Sidebar: React.FC<{}> = () => {
  const isLoggedIn = useSelector(authSelector.isLoggedIn);
  const { hasOpened, close } = useContext(SidebarContext);
  return (
    <InjectedComponent
      isLoggedIn={isLoggedIn}
      sidebarConfig={SIDEBAR_ROUTER_CONFIG}
      hasOpened={hasOpened}
      close={close}
    />
  );
};
export default Sidebar;
