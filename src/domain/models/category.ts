import { TBase } from './base';
import { NestedPartial } from '@/library/types';

type TCategory = TBase & {
  uid: string;
  username: string;
};

export type Category = Readonly<TCategory>;
export type PartialCategory = NestedPartial<Category>;
