import * as admin from 'firebase-admin';
export class VerifyCodeUseCase {
    constructor() { }
    create() {
        return new VerifyCodeUseCase();
    }
    async execute(email) {
        const db = admin.firestore();
        const doc = await db.collection('verificationCodes').doc(email).get();
        return doc.data()?.code;
    }
}
