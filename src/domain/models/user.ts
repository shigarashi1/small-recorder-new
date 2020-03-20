import { TBase } from './base';
import { NestedPartial } from '@/library/types';

type TUser = TBase & {
  uid: string;
  username: string;
};

export type User = Readonly<TUser>;
export type PartialUser = NestedPartial<User>;
