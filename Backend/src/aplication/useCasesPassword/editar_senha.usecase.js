import * as admin from 'firebase-admin';
export class EditarSenhaUseCase {
    constructor() { }
    create() {
        return new EditarSenhaUseCase();
    }
    async execute(email, newPassword) {
        const user = await admin.auth().getUserByEmail(email);
        await admin.auth().updateUser(user.uid, {
            password: newPassword
        });
        //implementar camada de abstração infraestructure(ou common), para colocar Implementações de autenticação
    }
}
