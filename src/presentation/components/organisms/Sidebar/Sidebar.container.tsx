import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { authSelector } from '@/application/selector/entity/auth';
import { ROUTER_CONFIG_ARRAY } from '@/presentation/lookups/router';

import CSidebar from './Sidebar';
import { SidebarContext } from './Sidebar.provider';

const Sidebar: React.FC<{}> = () => {
  const isLoggedIn = useSelector(authSelector.isLoggedIn);
  const { hasOpened, close } = useContext(SidebarContext);
  return <CSidebar isLoggedIn={isLoggedIn} routerConfig={ROUTER_CONFIG_ARRAY} hasOpened={hasOpened} close={close} />;
};
export default Sidebar;
