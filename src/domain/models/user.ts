import { TBaseDomainModel, Domain } from './base';
import { NestedPartial } from '@/library/types';

type TUser = TBaseDomainModel & {
  uid: string;
  username: string;
};

export type User = Domain<TUser>;
export type PartialUser = NestedPartial<User>;
