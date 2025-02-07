import { db } from "../../persistence/firebase_config/firebase";

export class VerifyCodeUseCase{
    constructor(){}

    public create(): VerifyCodeUseCase{
        return new VerifyCodeUseCase();
    }

    async execute(email: string){
        const doc = await db.collection('verificationCodes').doc(email).get();
        return doc.data()?.code;
    }
}