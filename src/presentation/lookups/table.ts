import { Column } from 'material-table';
import { TI18nObj, TLangCode } from '../types';
import { Category } from '@DomainModels/category';
import { Target } from '@DomainModels/target';
import { getText } from '../i18n';
import { partial, eqProps } from '@/library/ramda';
import { IndexesObject } from '@/library/types';

type CustomColumn<T extends object> = Omit<Column<T>, 'title'> & { title: TI18nObj };
type LookupConfig<T = any> = { field: string; lookups: T[]; converter: (v: T[]) => IndexesObject<string> };

const CATEGORY_SETTING_TABLE: CustomColumn<Category>[] = [
  //
  { field: 'name', title: { jp: 'カテゴリ名', en: 'Category' } },
  { field: 'hasDeleted', title: { jp: '削除済', en: 'Deleted' }, type: 'boolean' },
];

const TARGET_SETTING_TABLE: CustomColumn<Target>[] = [
  //
  { field: 'categoryId', title: { jp: 'カテゴリ', en: 'Category' }, lookup: {} },
  { field: 'count', title: { jp: '回数', en: 'Times' }, type: 'numeric' },
  { field: 'term', title: { jp: '期間', en: 'Period' } },
];

const replaceTitle = <T extends object>(langCode: TLangCode, col: CustomColumn<T>): Column<T> => ({
  ...col,
  title: getText(col.title, langCode),
});

const addLookup = (lookupConfig: LookupConfig[]) => <T extends object>(col: Column<T>) => {
  const match = lookupConfig.find(eqProps('field', col));
  return !match ? col : { ...col, lookup: match.converter(match.lookups) };
};

export const getCategoryTableConfig = (langCode: TLangCode): Column<Category>[] =>
  CATEGORY_SETTING_TABLE.map(partial(replaceTitle, [langCode]));

export const getTargetTableConfig = (langCode: TLangCode, lookupConfig: LookupConfig<Category>[]): Column<Target>[] =>
  TARGET_SETTING_TABLE.map(partial(replaceTitle, [langCode])).map(addLookup(lookupConfig));
