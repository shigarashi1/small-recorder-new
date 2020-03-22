import firebase from './import';

// auth
export type UserCredential = firebase.auth.UserCredential;
export type FirebaseUser = Pick<firebase.User, 'uid' | 'emailVerified' | 'isAnonymous' | 'photoURL' | 'email'>;
const { SESSION, LOCAL, NONE } = firebase.auth.Auth.Persistence;
export const EPersistence = { SESSION, LOCAL, NONE } as const;
