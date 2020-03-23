import firebase from './import';

import prop from 'ramda/es/prop';
import omit from 'ramda/es/omit';
import partial from 'ramda/es/partial';
import drop from 'ramda/es/drop';
import head from 'ramda/es/head';
import pipe from 'ramda/es/pipe';
import map from 'ramda/es/map';

import { TBaseDomainModel } from '@/domain/models/base';
import { ApiError } from '@/library/models/error';
import { toArray } from '@/library/helpers';
import { Logger } from '@/library/models/logger';
import { db } from '.';

// スキーマ名を指定する
export const ECollectionName = {
  Users: 'users',
  Categories: 'categories',
  Targets: 'targets',
  Records: 'records',
} as const;
export type TCollectionName = typeof ECollectionName[keyof typeof ECollectionName];

// 階層下げる必要があれば指定
const dbPath = 'api/v1';

// types
const collection = db.collection('_');
export type QueryListener = ReturnType<typeof collection.onSnapshot>;
export type Query = ReturnType<typeof collection.where>;
export type ServerTimestamp = ReturnType<typeof firebase.firestore.FieldValue.serverTimestamp>;
export type QueryDocSnapshot = firebase.firestore.QueryDocumentSnapshot;
export type QuerySnapshot = firebase.firestore.QuerySnapshot;
export type DocData = firebase.firestore.DocumentData;
export type DocRef = firebase.firestore.DocumentReference;
export type CollectionRef = firebase.firestore.CollectionReference;
export type TimeStamp = firebase.firestore.Timestamp;

export const getCollection = (collectionName: TCollectionName): CollectionRef =>
  db.collection(`${[dbPath, collectionName].join('/')}`);
export const toDocRef = (collectionName: TCollectionName, id: string) => getCollection(collectionName).doc(id);
export const getServerTime = (): ServerTimestamp => firebase.firestore.FieldValue.serverTimestamp();
export const toDate = (date?: { seconds: number; nanoseconds: number }): Date =>
  date ? new firebase.firestore.Timestamp(date.seconds, date.nanoseconds).toDate() : new Date();

type ModelConvFunc<T extends TBaseDomainModel> = (v: QueryDocSnapshot | DocData) => T;
type DocRefColumn<T extends TBaseDomainModel> = {
  fieldPath: keyof T | string;
  opStr: firebase.firestore.WhereFilterOp;
  ref: DocRef | string | number;
};
type DocOrderColumn<T extends TBaseDomainModel> = {
  fieldPath: keyof T;
  directionStr?: 'desc' | 'asc';
};
type ChangedParameter<T extends TBaseDomainModel> = {
  onNext: (v: T[]) => void;
  onError: (error: Error) => void;
  onCompleted?: () => void;
};

export type DocGetOptions<T extends TBaseDomainModel> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  canStart: boolean;
  conditions?: DocRefColumn<T> | DocRefColumn<T>[];
  orders?: DocOrderColumn<T> | DocOrderColumn<T>[];
};
export type TCreateDocConfig<T extends TBaseDomainModel> = {
  propName: keyof Omit<T, 'id' | 'createdAt' | 'updatedAt'>;
  rename?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toConv?: (v: any) => any;
}[];

const voidFunction = () => {
  Logger.log('called voidFunction');
};

const _toObjectArray = <T extends TBaseDomainModel>(toDomainModel: ModelConvFunc<T>, q: QuerySnapshot): T[] =>
  map(toDomainModel, [q.docs]);
const toObjectArray = <T extends TBaseDomainModel>(toDomainModel: ModelConvFunc<T>) =>
  partial<ModelConvFunc<T>, QuerySnapshot, T[]>(_toObjectArray, [toDomainModel]);

const _setQueryConditions = <T extends TBaseDomainModel>(
  conditions: DocRefColumn<T>[],
  collectionRef: CollectionRef | Query,
): CollectionRef | Query => {
  if (conditions.length < 1) {
    return collectionRef;
  }
  const first = head(conditions) as DocRefColumn<T>;
  return drop(1, conditions).reduce(
    (collection, { fieldPath, opStr, ref }) => collection.where(String(fieldPath), opStr, ref),
    collectionRef.where(String(first.fieldPath), first.opStr, first.ref),
  );
};
const _setOrderConditions = <T extends TBaseDomainModel>(
  conditions: DocOrderColumn<T>[],
  collectionRef: CollectionRef | Query,
): CollectionRef | Query => {
  if (conditions.length < 1) {
    return collectionRef;
  }
  const first = head(conditions) as DocOrderColumn<T>;
  return drop(1, conditions).reduce(
    (collection, { fieldPath, directionStr }) => collection.orderBy(String(fieldPath), directionStr || 'asc'),
    collectionRef.orderBy(String(first.fieldPath), first?.directionStr || 'asc'),
  );
};

const setCondtions = <T extends TBaseDomainModel>(options?: DocGetOptions<T>) =>
  pipe(
    partial<DocRefColumn<T>[], CollectionRef | Query, CollectionRef | Query>(_setQueryConditions, [
      toArray(options?.conditions),
    ]),
    partial<DocOrderColumn<T>[], CollectionRef | Query, CollectionRef | Query>(_setOrderConditions, [
      toArray(options?.orders),
    ]),
  );

const toDocObject = <T extends TBaseDomainModel>(config: TCreateDocConfig<T>, model: T) =>
  config.reduce((obj, { propName, rename, toConv }) => {
    const value = prop(propName, model);
    return { ...obj, [rename ? rename : propName]: toConv ? toConv(value) : value };
  }, {});

export const onChanged = <T extends TBaseDomainModel>(
  collectionName: TCollectionName,
  toDomainModel: ModelConvFunc<T>,
  observable: ChangedParameter<T>,
  options?: DocGetOptions<T>,
): typeof voidFunction => {
  if (!!options && !options.canStart) {
    return voidFunction;
  }
  return setCondtions(options)(getCollection(collectionName)).onSnapshot(
    pipe(toObjectArray(toDomainModel), observable.onNext),
    observable.onError, //
    observable.onCompleted,
  );
};

export const createDoc = async <T extends TBaseDomainModel>(
  collectionName: TCollectionName,
  toDomainModel: ModelConvFunc<T>,
  config: TCreateDocConfig<T>,
  model: T,
): Promise<T | ApiError> => {
  const serverTime = getServerTime();
  const data = {
    ...toDocObject(config, model),
    createdAt: serverTime,
    updatedAt: serverTime,
  };
  return getCollection(collectionName)
    .add(data)
    .then(toDomainModel)
    .catch((err) => new ApiError(err));
};

export const readDocs = async <T extends TBaseDomainModel>(
  collectionName: TCollectionName,
  toDomainModel: ModelConvFunc<T>,
  options?: DocGetOptions<T>,
): Promise<T[] | ApiError> =>
  setCondtions(options)(getCollection(collectionName))
    .get()
    .then(toObjectArray(toDomainModel))
    .catch((err) => new ApiError(err));

export const readDocById = async <T extends TBaseDomainModel>(
  collectionName: TCollectionName,
  toDomainModel: ModelConvFunc<T>,
  id: string,
): Promise<T | ApiError> =>
  getCollection(collectionName)
    .doc(id)
    .get()
    .then(toDomainModel)
    .catch((err) => new ApiError(err));

export const updateDoc = async <T extends TBaseDomainModel>(
  collectionName: TCollectionName,
  id: string,
  data: T,
  omitKeys: (keyof Omit<T, 'id' | 'createdAt' | 'updatedAt'>)[] = [],
): Promise<void | ApiError> =>
  getCollection(collectionName)
    .doc(id)
    .update({
      ...omit([...(omitKeys as string[]), 'id', 'createdAt', 'updatedAt'], data), //
      updatedAt: getServerTime(),
    })
    .catch((err) => new ApiError(err));

export const deleteDocById = async (collectionName: TCollectionName, id: string): Promise<void | ApiError> =>
  getCollection(collectionName)
    .doc(id)
    .delete()
    .catch((err) => new ApiError(err));

export const getRepositoryFunctions = <T extends TBaseDomainModel, F extends ModelConvFunc<T>>(
  collectionName: TCollectionName,
  toDomainModel: F,
) => ({
  createDoc: partial<TCollectionName, F, TCreateDocConfig<T>, T, Promise<T | ApiError>>(createDoc, [
    collectionName,
    toDomainModel,
  ]),
  readDocs: partial<TCollectionName, F, DocGetOptions<T>, Promise<T[] | ApiError>>(readDocs, [
    collectionName,
    toDomainModel,
  ]),
  readDocById: partial<TCollectionName, F, string, Promise<T | ApiError>>(readDocById, [
    collectionName, //
    toDomainModel,
  ]),
  updateDoc: partial<
    TCollectionName,
    string,
    T,
    (keyof Omit<T, 'id' | 'createdAt' | 'updatedAt'>)[] | undefined,
    Promise<void | ApiError>
  >(updateDoc, [
    collectionName, //
  ]),
  deleteDocById: partial<TCollectionName, string, Promise<void | ApiError>>(deleteDocById, [
    collectionName, //
  ]),
  onChanged: partial<TCollectionName, F, ChangedParameter<T>, DocGetOptions<T>, () => void>(onChanged, [
    collectionName,
    toDomainModel,
  ]),
});
