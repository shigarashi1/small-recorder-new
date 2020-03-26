import React from 'react';
import { RouteComponentProps } from 'react-router';

import { TI18nObj } from '../types';
import ErrorBoundary from '@Components/others/ErrorBoundary/ErrorBoundary';

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
  Sample: '/sample:mode',
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
  component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
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
    component: ErrorBoundary,
  },
  Login: {
    exact: true,
    icon: 'input',
    showSidebar: true,
    isDisableLoggedIn: true,
  },
  SignUp: {
    exact: true,
  },
  PasswordReset: {
    exact: true,
  },
  Manual: {
    exact: true,
    icon: 'import_contacts',
    showSidebar: true,
  },
  Technology: {
    exact: true,
    icon: 'desktop_mac',
    showSidebar: true,
  },
  Forbidden: {
    exact: true,
  },
  NotFound: {
    exact: true,
  },
  Sample: {
    exact: true,
    icon: 'accessibility_new',
    showSidebar: true,
  },
  Home: {
    exact: true,
    isPrivate: true,
    icon: 'home',
    showSidebar: true,
  },
  MyRecord: {
    exact: true,
    icon: 'create',
    isPrivate: true,
    showSidebar: true,
  },
  MyReport: {
    exact: true,
    icon: 'date_range',
    isPrivate: true,
    showSidebar: true,
  },
  MySearch: {
    exact: true,
    icon: 'search',
    isPrivate: true,
    showSidebar: true,
  },
  MySetting: {
    exact: true,
    icon: 'settings',
    isPrivate: true,
    showSidebar: true,
  },
};

export const ROUTER_CONFIG_ARRAY = Object.entries(ROUTER_CONFIG).reduce(
  (pre, [path, config]) => [...pre, { pathProps: path as PathProps, ...config }],
  [] as TRouterConfig[],
);
export const ROOT_ROUTER_CONFIG = ROUTER_CONFIG_ARRAY.filter(({ isPrivate }) => !isPrivate);
export const PRIVATE_ROUTER_CONFIG = ROUTER_CONFIG_ARRAY.filter(({ isPrivate }) => isPrivate);
