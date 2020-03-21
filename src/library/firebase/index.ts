import firebase from './import';
import { config } from '@/configuration/config';

const instance = firebase.initializeApp(config.firebase);
export const auth = instance.auth();
export const db = firebase.firestore(instance);

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
export type ServerTimestamp = ReturnType<typeof firebase.firestore.FieldValue.serverTimestamp>;
export type QueryDocSnapshot = firebase.firestore.QueryDocumentSnapshot;
export type QuerySnapshot = firebase.firestore.QuerySnapshot;
export type DocRef = firebase.firestore.DocumentReference;
export type CollectionRef = firebase.firestore.CollectionReference;
export type TimeStamp = firebase.firestore.Timestamp;
export type TDocRefColumn = {
  fieldPath: string | firebase.firestore.FieldPath;
  opStr: firebase.firestore.WhereFilterOp;
  ref: DocRef;
};

// auth
export type TUserCredential = firebase.auth.UserCredential;
export type TFirebaseUser = Pick<firebase.User, 'uid' | 'emailVerified' | 'isAnonymous' | 'photoURL' | 'email'>;
const { SESSION, LOCAL, NONE } = firebase.auth.Auth.Persistence;
export const EPersistence = { SESSION, LOCAL, NONE } as const;

// functions
export const getCollection = (collectionName: TCollectionName): CollectionRef =>
  db.collection(`${[dbPath, collectionName].join('/')}`);
export const toDocRef = (collectionName: TCollectionName, id: string) => getCollection(collectionName).doc(id);
export const getServerTime = (): ServerTimestamp => firebase.firestore.FieldValue.serverTimestamp();
export const toDate = (seconds: number, nanoseconds: number): Date =>
  new firebase.firestore.Timestamp(seconds, nanoseconds).toDate();
