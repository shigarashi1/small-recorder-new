import React, { useContext, ComponentProps, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authSelector } from '@Selector/entity/auth';
import { SidebarContext } from '../Sidebar/Sidebar.provider';
import { ShowInfoDialogParam } from '@/presentation/types';

import InjectedComponent from './Header';
import { infoDialogActions } from '@Events/ui/info-dialog';

type TProps = Pick<ComponentProps<typeof InjectedComponent>, 'isStatic'>;
const Header: React.FC<TProps> = ({ isStatic }) => {
  const isLoggedIn = useSelector(authSelector.isLoggedIn);
  const username = useSelector(authSelector.username);
  const { hasOpened, close, open } = useContext(SidebarContext);
  const dispatch = useDispatch();
  const showInfoDialog = useCallback(
    (v: ShowInfoDialogParam) => {
      dispatch(infoDialogActions.show(v));
    },
    [dispatch],
  );
  return (
    <InjectedComponent
      isStatic={isStatic}
      isLoggedIn={isLoggedIn}
      username={username}
      hasOpened={hasOpened}
      openSidebar={open}
      closeSidebar={close}
      showInfoDialog={showInfoDialog}
    />
  );
};
export default Header;
