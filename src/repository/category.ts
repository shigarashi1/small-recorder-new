import pipe from 'ramda/es/pipe';
import partial from 'ramda/es/partial';
import partialRight from 'ramda/es/partialRight';

import { Category } from '@/domain/models/category';
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
  name: String(v.data()),
  hasDeleted: Boolean(v.data().hasDeleted || false),
  createdAt: toDate(v.data().createdAt),
  updatedAt: toDate(v.data().updatedAt),
});

const getReadOptions = (userId: string): DocGetOptions<Category> => ({
  conditions: [{ fieldPath: 'user', opStr: '==', ref: toDocRef(ECollectionName.Users, userId) }],
  orders: [{ fieldPath: 'createdAt' }],
});

const config: TCreateDocConfig<Category> = [
  {
    propName: 'userId',
    rename: 'user',
    toConv: partial(toDocRef, [ECollectionName.Users]),
  },
];

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
