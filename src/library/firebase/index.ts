import firebase from './import';

import { config } from '@/configuration/config';

const instance = firebase.initializeApp(config.firebase);
export const auth = instance.auth();
export const db = firebase.firestore(instance);
