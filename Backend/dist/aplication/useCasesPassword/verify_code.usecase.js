import { db } from "../../persistence/firebase_config/firebase.js";
export class VerifyCodeUseCase {
    constructor() { }
    create() {
        return new VerifyCodeUseCase();
    }
    async execute(email) {
        const doc = await db.collection('verificationCodes').doc(email).get();
        return doc.data()?.code;
    }
}
