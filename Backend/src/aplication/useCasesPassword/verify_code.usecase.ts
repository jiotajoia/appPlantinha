import * as admin from 'firebase-admin';

export class VerifyCodeUseCase{
    constructor(){}

    public create(): VerifyCodeUseCase{
        return new VerifyCodeUseCase();
    }

    async execute(email: string){
        const db = admin.firestore();
        const doc = await db.collection('verificationCodes').doc(email).get();
        return doc.data()?.code;
    }
}