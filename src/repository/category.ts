import { pipe, partial, partialRight } from '@/library/ramda';

import { Category } from '@DomainModels/category';
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

const toCategory = (v: QueryDocSnapshot | DocData): Category => ({
  id: v.id,
  userId: v.get('user').id,
  name: String(v.data().name || ''),
  hasDeleted: Boolean(v.data().hasDeleted || false),
  createdAt: toDate(v.data().createdAt),
  updatedAt: toDate(v.data().updatedAt),
});

const getReadOptions = (userId: string): DocGetOptions<Category> => ({
  canSubscription: !!userId,
  conditions: [{ fieldPath: 'user', opStr: '==', ref: toDocRef(ECollectionName.Users, userId) }],
  orders: [{ fieldPath: 'createdAt' }],
});

const config: TCreateDocConfig<Category> = {
  userId: {
    rename: 'user',
    toConv: partial(toDocRef, [ECollectionName.Users]),
  },
};

const {
  createDoc, //
  readDocs,
  readDocById,
  updateDoc,
  deleteDocById,
  onChanged,
} = getRepositoryFunctions<Category, typeof toCategory>(ECollectionName.Categories, toCategory);

export const categoryRepositories = {
  createDoc: partial(createDoc, [config]),
  readDocs: pipe(getReadOptions, readDocs),
  readDocById,
  updateDoc,
  deleteDocById,
  onChanged: (userId: string) => partialRight(onChanged, [getReadOptions(userId)]),
};
