import { pipe, partial, partialRight } from '@/library/ramda';

import { User } from '@DomainModels/user';
import {
  DocGetOptions,
  TCreateDocConfig,
  getRepositoryFunctions,
  QueryDocSnapshot,
  DocData,
  toDate,
  toDocRef,
  ECollectionName,
} from '@/library/firebase/store';

const toUser = (v: QueryDocSnapshot | DocData): User => ({
  id: v.id,
  uid: String(v.data().uid || ''),
  username: String(v.data().name || ''),
  createdAt: toDate(v.data().createdAt),
  updatedAt: toDate(v.data().updatedAt),
});

const getReadOptions = (uid: string): DocGetOptions<User> => ({
  canSubscription: !!uid,
  conditions: [{ fieldPath: 'uid', opStr: '==', ref: toDocRef(ECollectionName.Users, uid) }],
  orders: [{ fieldPath: 'createdAt' }],
});

const config: TCreateDocConfig<User> = {};

const {
  createDoc, //
  readDocs,
  readDocById,
  updateDoc,
  deleteDocById,
  onChanged,
} = getRepositoryFunctions<User, typeof toUser>(ECollectionName.Users, toUser);

export const userRepositories = {
  createDoc: partial(createDoc, [config]),
  readDocs: pipe(getReadOptions, readDocs),
  readDocById,
  updateDoc,
  deleteDocById,
  onChanged: (uid: string) => partialRight(onChanged, [getReadOptions(uid)]),
};
