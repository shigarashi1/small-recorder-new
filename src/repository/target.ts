import { pipe, partial, partialRight } from '@/library/ramda';

import { Target, ETargetTerm } from '@DomainModels/target';
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
  canSubscription: !!userId,
  conditions: [{ fieldPath: 'user', opStr: '==', ref: toDocRef(ECollectionName.Users, userId) }],
  orders: [{ fieldPath: 'createdAt' }],
});

const config: TCreateDocConfig<Target> = {
  userId: {
    rename: 'user',
    toConv: partial(toDocRef, [ECollectionName.Users]),
  },
  categoryId: {
    rename: 'category',
    toConv: partial(toDocRef, [ECollectionName.Categories]),
  },
};

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
