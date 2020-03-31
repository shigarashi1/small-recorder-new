import React, { useContext, ComponentProps, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { authSelector } from '@Selector/entity/auth';
import { SidebarContext } from '../Sidebar/Sidebar.provider';
import { OpenInfoDialogFn } from '@/presentation/types';
import { Logger } from '@/library/models/logger';

import Comp from './Header';

type TProps = Pick<ComponentProps<typeof Comp>, 'isStatic'>;
const Header: React.FC<TProps> = ({ isStatic }) => {
  const isLoggedIn = useSelector(authSelector.isLoggedIn);
  const username = useSelector(authSelector.username);
  const { hasOpened, close, open } = useContext(SidebarContext);
  const openInfoDialog = useCallback((v: Parameters<OpenInfoDialogFn>[0]) => {
    Logger.log(v);
  }, []);
  return (
    <Comp
      isStatic={isStatic}
      isLoggedIn={isLoggedIn}
      username={username}
      hasOpened={hasOpened}
      openSidebar={open}
      closeSidebar={close}
      openInfoDialog={openInfoDialog}
    />
  );
};
export default Header;
