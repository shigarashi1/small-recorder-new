import React from 'react';
import { RouteComponentProps } from 'react-router';

import TopPage from '../pages/TopPage/TopPage';
import { TI18nObj } from '../types';
import HomePage from '../pages/HomePage/HomePage';
import ManualPage from '../pages/ManualPage/ManualPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import TechnologyPage from '../pages/TechnologyPage/TechnologyPage';
import ForbiddenPage from '../pages/ForbiddenPage/ForbiddenPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import PasswordResetPage from '../pages/PasswordResetPage/PasswordResetPage';
import SamplePage from '../pages/SamplePage/SamplePage';
import RecordPage from '../pages/RecordPage/RecordPage';
import ReportPage from '../pages/ReportPage/ReportPage';
import SearchPage from '../pages/SearchPage/SearchPage';
import SettingPage from '../pages/SettingPage/SettingPage';

export const EPath = {
  Top: '/',
  Login: '/login',
  SignUp: '/sign-up',
  PasswordReset: '/reset-password',
  Manual: '/manual',
  Technology: '/technology',
  Forbidden: '/forbidden',
  NotFound: '/found-not',
  // sample
  Sample: '/sample/:mode',
  // private
  Home: '/private',
  MyRecord: '/private/records',
  MyReport: '/private/reports',
  MySearch: '/private/search',
  MySetting: '/private/setting',
} as const;
type PathProps = keyof typeof EPath;
export type TPath = typeof EPath[PathProps];

export const Title: Record<PathProps, TI18nObj> = {
  Top: { jp: 'トップ', en: 'Top' },
  Login: { jp: 'ログイン', en: 'Login' },
  SignUp: { jp: 'ユーザー登録', en: 'SignUp' },
  PasswordReset: { jp: 'パスワードリセット', en: 'Password Reset' },
  Manual: { jp: '使い方', en: 'Manual' },
  Technology: { jp: '技術情報', en: 'Technology' },
  Forbidden: { jp: '不正なアクセス', en: 'Forbidden' },
  NotFound: { jp: 'お探しのページがありません', en: 'NotFound' },
  Sample: { jp: 'サンプル', en: 'Sample' },
  Home: { jp: 'ホーム', en: 'Home' },
  MyRecord: { jp: '記録', en: 'Record' },
  MyReport: { jp: 'レポート', en: 'Report' },
  MySearch: { jp: '検索', en: 'Search' },
  MySetting: { jp: '設定', en: 'Setting' },
};

type TIcon =
  | 'input'
  | 'person_add'
  | 'home'
  | 'settings'
  | 'import_contacts'
  | 'desktop_mac'
  | 'accessibility_new'
  | 'date_range'
  | 'search'
  | 'create';

type TRouter = {
  exact?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  isPrivate?: boolean;
  // sidebar
  icon?: TIcon;
  showSidebar?: boolean;
  isDisableLoggedIn?: boolean;
  // sidebar & brouserTab
  title?: PathProps;
};
type TRouterConfig = { pathProps: PathProps } & TRouter;

const ROUTER_CONFIG: Record<keyof typeof EPath, TRouter> = {
  Top: {
    exact: true,
    component: TopPage,
  },
  Login: {
    exact: true,
    component: LoginPage,
    icon: 'input',
    showSidebar: true,
    isDisableLoggedIn: true,
  },
  SignUp: {
    exact: true,
    component: SignUpPage,
  },
  PasswordReset: {
    exact: true,
    component: PasswordResetPage,
  },
  Manual: {
    exact: true,
    component: ManualPage,
    icon: 'import_contacts',
    showSidebar: true,
  },
  Technology: {
    exact: true,
    component: TechnologyPage,
    icon: 'desktop_mac',
    showSidebar: true,
  },
  Forbidden: {
    exact: true,
    component: ForbiddenPage,
  },
  NotFound: {
    exact: true,
    component: NotFoundPage,
  },
  Sample: {
    exact: true,
    component: SamplePage,
    icon: 'accessibility_new',
    showSidebar: true,
  },
  // Private
  MyRecord: {
    exact: true,
    component: RecordPage,
    icon: 'create',
    isPrivate: true,
    showSidebar: true,
  },
  MyReport: {
    exact: true,
    component: ReportPage,
    icon: 'date_range',
    isPrivate: true,
    showSidebar: true,
  },
  MySearch: {
    exact: true,
    component: SearchPage,
    icon: 'search',
    isPrivate: true,
    showSidebar: true,
  },
  MySetting: {
    exact: true,
    component: SettingPage,
    icon: 'settings',
    isPrivate: true,
    showSidebar: true,
  },
  Home: {
    exact: true,
    component: HomePage,
    isPrivate: true,
    icon: 'home',
    showSidebar: true,
  },
};

export const ROUTER_CONFIG_ARRAY = Object.entries(ROUTER_CONFIG).reduce(
  (pre, [path, config]) => [...pre, { pathProps: path as PathProps, ...config }],
  [] as TRouterConfig[],
);
export const ROOT_ROUTER_CONFIG = ROUTER_CONFIG_ARRAY.filter(({ isPrivate }) => !isPrivate);
export const PRIVATE_ROUTER_CONFIG = ROUTER_CONFIG_ARRAY.filter(({ isPrivate }) => isPrivate);
