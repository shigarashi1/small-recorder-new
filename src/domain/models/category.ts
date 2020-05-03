import { TBaseDomainModel, Domain } from './base';
import { NestedPartial } from '@/library/types';

type TCategory = TBaseDomainModel & {
  userId: string;
  name: string;
  hasDeleted: boolean;
};

export type Category = Domain<TCategory>;
export type PartialCategory = NestedPartial<Category>;
