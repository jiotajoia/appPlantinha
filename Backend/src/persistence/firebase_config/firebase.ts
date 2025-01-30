import admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";


admin.initializeApp({
  credential: admin.credential.cert(require("../teste-key.json")),
});

export const auth = getAuth();
export const db = getFirestore();