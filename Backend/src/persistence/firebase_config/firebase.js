"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.auth = void 0;
var admin = require("firebase-admin");
var auth_1 = require("firebase-admin/auth");
var firestore_1 = require("firebase-admin/firestore");
admin.initializeApp({
    credential: admin.credential.cert(require("../../../key_admin_sdk.json")),
});
exports.auth = (0, auth_1.getAuth)();
exports.db = (0, firestore_1.getFirestore)();
