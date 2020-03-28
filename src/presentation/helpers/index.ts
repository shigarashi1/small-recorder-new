import { ROUTER_CONFIG_ARRAY, BROWSER_TITLE, EPath, SIDEBAR_TITLE, PathProps } from '../lookups/router';
import { TLangCode, TI18nObj } from '../types';
import { matchPath } from 'react-router';

export const getBrowserTitle = (
  defaultTitle: string,
  routerConfigArr: typeof ROUTER_CONFIG_ARRAY,
  titleConfig: typeof BROWSER_TITLE,
  langCode: TLangCode,
  pathname: string,
): string => {
  const matched = routerConfigArr.find(
    ({ pathProps }) =>
      !!matchPath(pathname, {
        path: EPath[pathProps],
        exact: true,
      }),
  );
  return matched ? `${defaultTitle} | ${titleConfig[matched.pathProps][langCode]}` : defaultTitle;
};

export const getSidebarTitle = (sidebarTitles: typeof SIDEBAR_TITLE, path: PathProps): TI18nObj =>
  sidebarTitles[path] || { jp: '' };
