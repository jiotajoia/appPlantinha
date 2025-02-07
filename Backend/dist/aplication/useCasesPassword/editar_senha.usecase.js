import { auth } from "../../persistence/firebase_config/firebase.js";
export class EditarSenhaUseCase {
    constructor() { }
    create() {
        return new EditarSenhaUseCase();
    }
    async execute(email, newPassword) {
        const user = await auth.getUserByEmail(email);
        await auth.updateUser(user.uid, {
            password: newPassword
        });
        //implementar camada de abstração infraestructure(ou common), para colocar Implementações de autenticação
    }
}
