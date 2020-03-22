import firebase from './import';

import pick from 'ramda/es/pick';
import pipe from 'ramda/es/pipe';

import { auth } from '.';
import { ApiError } from '../models/error';

// auth
export type UserCredential = firebase.auth.UserCredential;
type FirebaseUser = firebase.User;
export type PickedFirebaseUser = Pick<firebase.User, 'uid' | 'emailVerified' | 'isAnonymous' | 'photoURL' | 'email'>;
const { SESSION, LOCAL, NONE } = firebase.auth.Auth.Persistence;
export const EPersistence = { SESSION, LOCAL, NONE } as const;

const pickFirebaseUser = (user: FirebaseUser) =>
  pick(['uid', 'emailVerified', 'isAnonymous', 'photoURL', 'email'], user);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isUserCredential = (v: any): v is UserCredential => !!v?.credential;
const getFirebaseUser = (v: UserCredential | FirebaseUser | undefined | null): PickedFirebaseUser => {
  const user = !v ? undefined : isUserCredential(v) ? v?.user : v;
  if (!user) {
    throw new ApiError('E0000');
  }
  return pickFirebaseUser(user);
};

const signIn = async (email: string, password: string): Promise<ApiError | PickedFirebaseUser> => {
  const parsistenceRes = await auth.setPersistence(EPersistence.SESSION).catch((err) => new ApiError(err));
  if (parsistenceRes instanceof ApiError) {
    return parsistenceRes;
  }
  return auth
    .signInWithEmailAndPassword(email, password)
    .then(getFirebaseUser)
    .catch((err) => new ApiError(err));
};

const signUp = async (email: string, password: string): Promise<ApiError | PickedFirebaseUser> =>
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(getFirebaseUser)
    .catch((err) => new ApiError(err));

const signOut = async (): Promise<ApiError | void> => auth.signOut().catch((err) => new ApiError(err));

const onAuthStateChanged = auth.onAuthStateChanged;

const getAuthState = async () =>
  new Promise<PickedFirebaseUser | void>((resolve, reject) => {
    auth.onAuthStateChanged(
      pipe((user: firebase.User | null) => user, getFirebaseUser, resolve),
      pipe((error: firebase.auth.Error) => new ApiError(error), reject),
    );
  });

export const authenticationFunctions = {
  signIn,
  signUp,
  signOut,
  onAuthStateChanged,
  getAuthState,
};
