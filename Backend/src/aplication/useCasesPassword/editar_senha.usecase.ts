import { auth } from "../../persistence/firebase_config/firebase";

export class EditarSenhaUseCase{
    constructor(){}

    public create(): EditarSenhaUseCase{
        return new EditarSenhaUseCase();
    }

    async execute(email: string, newPassword: string): Promise<void>{

        const user = await auth.getUserByEmail(email);
        await auth.updateUser(user.uid, {
          password: newPassword
        });
        
        //implementar camada de abstração infraestructure(ou common), para colocar Implementações de autenticação
    }
}