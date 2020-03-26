import {
  getRepositoryFunctions,
  ECollectionName,
  QueryDocSnapshot,
  DocData,
  toDate,
  DocGetOptions,
  toDocRef,
  TCreateDocConfig,
} from '@/library/firebase/store';
import { Record } from '@/domain/models/record';
import partial from 'ramda/es/partial';
import pipe from 'ramda/es/pipe';
import partialRight from 'ramda/es/partialRight';

const toRecord = (v: QueryDocSnapshot | DocData): Record => ({
  id: v.id,
  userId: v.get('user').id,
  categoryId: v.get('category').id,
  date: String(v.data().date || ''),
  record: String(v.data().record || ''),
  createdAt: toDate(v.data().createdAt),
  updatedAt: toDate(v.data().updatedAt),
});

type TReadOption = {
  userId: string;
  to: string;
  from: string;
};
const getReadOptions = (v: TReadOption): DocGetOptions<Record> => ({
  canSubscription: !!v.userId && !!v.from && !!v.to,
  conditions: [
    { fieldPath: 'user', opStr: '==', ref: toDocRef(ECollectionName.Users, v.userId) },
    { fieldPath: 'date', opStr: '<=', ref: +v.to },
    { fieldPath: 'date', opStr: '>=', ref: +v.from },
  ],
  orders: [
    { fieldPath: 'date' }, //
    { fieldPath: 'createdAt' },
  ],
});

const config: TCreateDocConfig<Record> = {
  userId: {
    rename: 'user',
    toConv: partial(toDocRef, [ECollectionName.Users]),
  },
  categoryId: {
    rename: 'category',
    toConv: partial(toDocRef, [ECollectionName.Categories]),
  },
  date: {
    toConv: (v: string | number) => (typeof v === 'string' ? +v : v),
  },
};

const {
  createDoc, //
  readDocs,
  readDocById,
  updateDoc,
  deleteDocById,
  onChanged,
} = getRepositoryFunctions<Record, typeof toRecord>(ECollectionName.Records, toRecord);

export const recordRepositories = {
  createDoc: partial(createDoc, [config]),
  readDocs: pipe(getReadOptions, readDocs),
  readDocById,
  updateDoc,
  deleteDocById,
  onChanged: (params: TReadOption) => partialRight(onChanged, [getReadOptions(params)]),
};
