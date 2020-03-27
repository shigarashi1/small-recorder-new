import React, { useCallback } from 'react';
import { useHistory } from 'react-router';

import styles from './Sidebar.module.scss';

import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';

import { TRouterConfig, TPath, EPath } from '@/presentation/lookups/router';

type TProps = {
  isLoggedIn: boolean;
  routerConfig: TRouterConfig[];
  hasOpened: boolean;
  close: () => void;
};

const Sidebar: React.FC<TProps> = ({ hasOpened, isLoggedIn, routerConfig, close }) => {
  const history = useHistory();
  const { pathname } = history.location;

  const onClose = useCallback(() => close(), [close]);
  const onGoToPage = useCallback(
    (path: TPath) => (event: React.MouseEvent<HTMLDivElement>) => {
      if (pathname !== path) {
        history.push(path);
      }
    },
    [history, pathname],
  );

  const canShowListItem = (item: TRouterConfig): boolean => !!item.showSidebar && (!item.isPrivate || isLoggedIn);
  const getClassName = (path: TPath): string | undefined => (pathname === path ? styles.listItemActive : undefined);
  const renderListItem = (item: TRouterConfig) =>
    canShowListItem(item) && (
      <ListItem
        key={`sidebar-link-${item.pathProps}`}
        button={true}
        divider={true}
        selected={pathname !== EPath[item.pathProps]}
        className={getClassName(EPath[item.pathProps])}
        onClick={onGoToPage(EPath[item.pathProps])}
      >
        {item.icon && (
          <ListItemIcon>
            <Icon>{item.icon}</Icon>
          </ListItemIcon>
        )}
        <ListItemText primary={item.pathProps} />
      </ListItem>
    );

  const renderSidebarContent = () => {
    return (
      <div className={styles.list}>
        <Toolbar>
          <IconButton onClick={onClose}>
            <Icon>chevron_right_icon</Icon>
          </IconButton>
        </Toolbar>
        <div className={styles.listContainer}>
          <List component="div" disablePadding={true}>
            {routerConfig.map(renderListItem)}
          </List>
        </div>
      </div>
    );
  };

  return (
    <nav>
      <Hidden implementation="css">
        <Drawer variant="temporary" anchor="right" open={hasOpened} onClose={onClose}>
          {renderSidebarContent()}
        </Drawer>
      </Hidden>
    </nav>
  );
};

export default Sidebar;
