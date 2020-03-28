import { ROUTER_CONFIG_ARRAY, BROWSER_TITLE, EPath, SIDEBAR_TITLE, TPathKey, TPath } from '../lookups/router';
import { TLangCode, TI18nObj } from '../types';
import { matchPath } from 'react-router';

export const isMatchPath = (pathname: string, path: TPath): boolean =>
  !!matchPath(pathname, {
    path: path,
    exact: true,
  });

export const getBrowserTitle = (
  defaultTitle: string,
  routerConfigArr: typeof ROUTER_CONFIG_ARRAY,
  titleConfig: typeof BROWSER_TITLE,
  langCode: TLangCode,
  pathname: string,
): string => {
  const matched = routerConfigArr.find(({ pathKey }) => isMatchPath(pathname, EPath[pathKey]));
  return matched ? `${defaultTitle} | ${titleConfig[matched.pathKey][langCode]}` : defaultTitle;
};

export const getSidebarTitle = (sidebarTitles: typeof SIDEBAR_TITLE, path: TPathKey): TI18nObj =>
  sidebarTitles[path] || { jp: '' };
