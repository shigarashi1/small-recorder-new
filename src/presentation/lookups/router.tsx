import React from 'react';
import pathOr from 'ramda/es/pathOr';
import sortBy from 'ramda/es/sortBy';
import { RouteComponentProps } from 'react-router';

import { TI18nObj } from '../types';
import TopPage from '../pages/TopPage/TopPage';
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
  MyRecord: '/private/records',
  MyReport: '/private/reports',
  MySearch: '/private/search',
  MySetting: '/private/options',
  Home: '/private',
} as const;
export type TPathKey = keyof typeof EPath;
export type TPath = typeof EPath[TPathKey];

export const BROWSER_TITLE: Record<TPathKey, TI18nObj> = {
  Top: { jp: 'トップ', en: 'Top' },
  Login: { jp: 'ログイン', en: 'Login' },
  SignUp: { jp: 'ユーザー登録', en: 'SignUp' },
  PasswordReset: { jp: 'パスワードリセット', en: 'Password Reset' },
  Manual: { jp: '使い方', en: 'Manual' },
  Technology: { jp: '技術情報', en: 'Technology' },
  Forbidden: { jp: 'ログインが必要です', en: 'Forbidden' },
  NotFound: { jp: 'お探しのページがありません', en: 'NotFound' },
  Sample: { jp: 'サンプル', en: 'Sample' },
  MyRecord: { jp: '記録', en: 'Record' },
  MyReport: { jp: 'レポート', en: 'Report' },
  MySearch: { jp: '検索', en: 'Search' },
  MySetting: { jp: '設定', en: 'Option' },
  Home: { jp: 'ホーム', en: 'Home' },
};

export const SIDEBAR_TITLE: Partial<Record<TPathKey, TI18nObj>> = {
  Login: { jp: 'ログイン', en: 'Login' },
  Manual: { jp: '使い方', en: 'Manual' },
  Technology: { jp: '技術情報', en: 'Technology' },
  Sample: { jp: 'サンプル', en: 'Sample' },
  MyRecord: { jp: 'レコード', en: 'Record' },
  MyReport: { jp: 'レポート', en: 'Report' },
  MySearch: { jp: '検索', en: 'Search' },
  MySetting: { jp: '設定', en: 'Option' },
  Home: { jp: 'ホーム', en: 'Home' },
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
  sidebar?: {
    order: number;
    icon: TIcon;
    isDisableLoggedIn?: boolean;
  };
};
export type TRouterConfig = { pathKey: TPathKey } & TRouter;

const ROUTER_CONFIG: Record<keyof typeof EPath, TRouter> = {
  Top: {
    exact: true,
    component: TopPage,
  },
  SignUp: {
    exact: true,
    component: SignUpPage,
  },
  PasswordReset: {
    exact: true,
    component: PasswordResetPage,
  },
  Login: {
    exact: true,
    component: LoginPage,
    sidebar: {
      order: 1,
      icon: 'input',
      isDisableLoggedIn: true,
    },
  },
  Forbidden: {
    exact: true,
    component: ForbiddenPage,
  },
  NotFound: {
    exact: true,
    component: NotFoundPage,
  },
  // Private
  Home: {
    exact: true,
    component: HomePage,
    isPrivate: true,
    sidebar: {
      order: 2,
      icon: 'home',
    },
  },
  MyRecord: {
    exact: true,
    component: RecordPage,
    isPrivate: true,
    sidebar: {
      order: 3,
      icon: 'create',
    },
  },
  MyReport: {
    exact: true,
    component: ReportPage,
    isPrivate: true,
    sidebar: {
      order: 4,
      icon: 'date_range',
    },
  },
  MySearch: {
    exact: true,
    component: SearchPage,
    isPrivate: true,
    sidebar: {
      order: 5,
      icon: 'search',
    },
  },
  MySetting: {
    exact: true,
    component: SettingPage,
    isPrivate: true,
    sidebar: {
      order: 6,
      icon: 'settings',
    },
  },
  Manual: {
    exact: true,
    component: ManualPage,
    sidebar: {
      order: 7,
      icon: 'import_contacts',
    },
  },
  Technology: {
    exact: true,
    component: TechnologyPage,
    sidebar: {
      order: 8,
      icon: 'desktop_mac',
    },
  },
  Sample: {
    exact: true,
    component: SamplePage,
    sidebar: {
      order: 9,
      icon: 'accessibility_new',
    },
  },
};

export const ROUTER_CONFIG_ARRAY = Object.entries(ROUTER_CONFIG).reduce(
  (pre, [path, config]) => [...pre, { pathKey: path as TPathKey, ...config }],
  [] as TRouterConfig[],
);
export const ROOT_ROUTER_CONFIG = ROUTER_CONFIG_ARRAY.filter(({ isPrivate }) => !isPrivate);
export const PRIVATE_ROUTER_CONFIG = ROUTER_CONFIG_ARRAY.filter(({ isPrivate }) => isPrivate);

//
export const SIDEBAR_ROUTER_CONFIG = sortBy(
  pathOr(99, ['sidebar', 'order']),
  ROUTER_CONFIG_ARRAY.filter(({ sidebar }) => !!sidebar),
);
