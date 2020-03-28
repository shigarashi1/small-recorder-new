import React, { useState, useCallback } from 'react';

import Icon from '@material-ui/core/Icon';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';

import styles from './Header.module.scss';
import LanguageSelect from '@Components/molecules/LanguageSelect/LanguageSelect.container';
import I18nText from '@Components/atoms/I18nText/I18nText.container';

import { OpenInfoDialogFn } from '@/presentation/types';
import { EPath, TPath } from '@/presentation/lookups/router';
import { useHistory } from 'react-router';
import { HeaderText } from './Header.i18n';
import { Logger } from '@/library/models/logger';

type TProps = {
  isStatic?: boolean;
  isLoggedIn: boolean;
  username: string;
  hasOpened: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  openInfoDialog: OpenInfoDialogFn;
};

const Header: React.FC<TProps> = ({
  isStatic,
  isLoggedIn,
  username,
  hasOpened,
  openSidebar,
  closeSidebar,
  openInfoDialog,
}) => {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const onGoToPage = useCallback(
    (path: TPath) => () => {
      history.push(path);
    },
    [history],
  );

  const onTogleSidebar = useCallback(() => {
    if (hasOpened) {
      closeSidebar();
    } else {
      openSidebar();
    }
  }, [closeSidebar, hasOpened, openSidebar]);

  const onLogout = useCallback(() => {
    openInfoDialog({
      // FIXME: I18n対応
      title: 'ログアウト確認',
      context: 'ログアウトします。よろしいですか？',
      ok: () => {
        Logger.log('ログアウト');
      },
    });
  }, [openInfoDialog]);

  const onOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onCloseMenu = () => {
    setAnchorEl(null);
  };

  const renderMenu = isLoggedIn ? (
    <Menu id="icon-menu-logged" anchorEl={anchorEl} keepMounted={true} open={Boolean(anchorEl)} onClose={onCloseMenu}>
      <MenuItem onClick={onGoToPage(EPath.MySetting)}>
        <I18nText i18nObj={HeaderText.settingBtn} />
      </MenuItem>
      <MenuItem onClick={onLogout}>
        <I18nText i18nObj={HeaderText.logoutBtn} />
      </MenuItem>
    </Menu>
  ) : (
    <Menu id="icon-menu" anchorEl={anchorEl} keepMounted={true} open={Boolean(anchorEl)} onClose={onCloseMenu}>
      <MenuItem onClick={onGoToPage(EPath.Login)}>
        <I18nText i18nObj={HeaderText.loginBtn} />
      </MenuItem>
    </Menu>
  );

  return (
    <React.Fragment>
      <AppBar id={styles.container} position={isStatic ? 'static' : 'fixed'}>
        <Toolbar className={styles.left}>
          <IconButton color="inherit" aria-label="Menu" onClick={onTogleSidebar}>
            <Icon>menu_icon</Icon>
          </IconButton>
          <Typography variant="h6" color="inherit">
            <Hidden xsDown={true}>
              <I18nText i18nObj={HeaderText.title} />
            </Hidden>
            <Hidden smUp={true}>
              <I18nText i18nObj={HeaderText.shortTitle} />
            </Hidden>
          </Typography>
        </Toolbar>
        <Toolbar className={styles.right}>
          <Hidden xsDown={true}>
            <LanguageSelect />
          </Hidden>
          <Button onClick={onOpenMenu} color="inherit">
            {username && (
              <Typography className={styles.username} variant="subtitle2" color="inherit">
                {username}
              </Typography>
            )}
            <Icon>account_circle</Icon>
          </Button>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </React.Fragment>
  );
};

export default Header;
