import { TBaseDomainModel, Domain } from './base';
import { NestedPartial } from '@/library/types';

type TRecord = TBaseDomainModel & {
  userId: string;
  categoryId: string;
  date: string;
  record: string;
};

export type Record = Domain<TRecord>;
export type PartialRecord = NestedPartial<Record>;
