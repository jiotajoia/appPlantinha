import admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const json = require('../../../key_admin_sdk.json.js');
admin.initializeApp({
    credential: admin.credential.cert(json),
});
export const auth = getAuth();
export const db = getFirestore();
