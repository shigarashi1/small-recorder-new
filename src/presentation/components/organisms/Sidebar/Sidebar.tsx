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

import { TRouterConfig, TPath, EPath, SIDEBAR_TITLE } from '@/presentation/lookups/router';
import I18nText from '@Components/atoms/I18nText/I18nText.container';
import { getSidebarTitle, isMatchPath } from '@/presentation/helpers';

type TProps = {
  isLoggedIn: boolean;
  sidebarConfig: TRouterConfig[];
  hasOpened: boolean;
  close: () => void;
};

const Sidebar: React.FC<TProps> = ({ hasOpened, isLoggedIn, sidebarConfig, close }) => {
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

  const canShowListItem = (item: TRouterConfig): boolean =>
    isLoggedIn ? !item?.sidebar?.isDisableLoggedIn : !item.isPrivate;
  const renderListItem = (item: TRouterConfig) =>
    canShowListItem(item) && (
      <ListItem
        key={`sidebar-link-${item.pathKey}`}
        button={true}
        divider={true}
        selected={isMatchPath(pathname, EPath[item.pathKey])}
        onClick={onGoToPage(EPath[item.pathKey])}
      >
        {item.sidebar?.icon && (
          <ListItemIcon>
            <Icon>{item.sidebar.icon}</Icon>
          </ListItemIcon>
        )}
        <ListItemText primary={<I18nText i18nObj={getSidebarTitle(SIDEBAR_TITLE, item.pathKey)} />} />
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
            {sidebarConfig.map(renderListItem)}
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
