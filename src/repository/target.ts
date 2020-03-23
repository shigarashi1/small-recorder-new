import pipe from 'ramda/es/pipe';
import partial from 'ramda/es/partial';
import partialRight from 'ramda/es/partialRight';

import { Target, ETargetTerm } from '@/domain/models/target';
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

const toTarget = (v: QueryDocSnapshot | DocData): Target => ({
  id: v.id,
  userId: v.get('user').id,
  categoryId: v.get('category').id,
  count: Number(v.data().count || 0),
  term: v.data().term || ETargetTerm.Day,
  createdAt: toDate(v.data().createdAt),
  updatedAt: toDate(v.data().updatedAt),
});

const getReadOptions = (userId: string): DocGetOptions<Target> => ({
  canStart: !!userId,
  conditions: [{ fieldPath: 'user', opStr: '==', ref: toDocRef(ECollectionName.Users, userId) }],
  orders: [{ fieldPath: 'createdAt' }],
});

const config: TCreateDocConfig<Target> = [
  {
    propName: 'userId',
    rename: 'user',
    toConv: partial(toDocRef, [ECollectionName.Users]),
  },
  {
    propName: 'categoryId',
    rename: 'category',
    toConv: partial(toDocRef, [ECollectionName.Categories]),
  },
  {
    propName: 'count',
  },
  {
    propName: 'term',
  },
];

const {
  createDoc, //
  readDocs,
  readDocById,
  updateDoc,
  deleteDocById,
  onChanged,
} = getRepositoryFunctions<Target, typeof toTarget>(ECollectionName.Targets, toTarget);

export const targetRepositories = {
  createDoc: partial(createDoc, [config]),
  readDocs: pipe(getReadOptions, readDocs),
  readDocById,
  updateDoc,
  deleteDocById,
  onChanged: (userId: string) => partialRight(onChanged, [getReadOptions(userId)]),
};
