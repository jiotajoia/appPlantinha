import * as admin from 'firebase-admin';

export class EditarSenhaUseCase{
    constructor(){}

    public create(): EditarSenhaUseCase{
        return new EditarSenhaUseCase();
    }

    async execute(email: string, newPassword: string): Promise<void>{

        const user = await admin.auth().getUserByEmail(email);
            await admin.auth().updateUser(user.uid, {
              password: newPassword
            });
    }
}