import { ROUTER_CONFIG_ARRAY, BROWSER_TITLE, EPath, SIDEBAR_TITLE, TPathKey, TPath } from '../lookups/router';
import { TLangCode, TI18nObj } from '../types';
import { matchPath } from 'react-router';
import { IndexesObject, TLookupItem } from '@/library/types';
import { prop, pipe } from '@/library/ramda';

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

// ObjectのPropertyからLookupItem[]を作る
export const object2LookupItems = <T>(idKey: keyof T, valueKey: keyof T) => (objArr: T[]): TLookupItem[] =>
  objArr.map((obj) => ({ id: String(prop(idKey, obj)), value: String(prop(valueKey, obj)) }));

// LookupItem[]から{id: value}のObjectを作る
export const toLookupObject = (lookupItems: TLookupItem[]): IndexesObject<string> =>
  lookupItems.reduce((pre, { id, value }) => ({ ...pre, [id]: value }), {});

// object2LookupItemsとtoLookupObjectをpipeで繋げたやつ
export const object2LookupObject = <T>(idKey: keyof T, valueKey: keyof T) =>
  pipe(object2LookupItems(idKey, valueKey), toLookupObject);
