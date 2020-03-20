import { TBase } from './base';
import { NestedPartial } from '@/library/types';

type TRecord = TBase & {
  userId: string;
  categoryId: string;
  date: string;
  record: string;
};

export type Record = Readonly<TRecord>;
export type PartialRecord = NestedPartial<Record>;
