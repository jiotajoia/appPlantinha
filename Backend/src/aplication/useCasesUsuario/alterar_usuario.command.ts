import { Usuario } from "../../domain/entities/usuario.entity";
import { UserRepo } from "../../domain/repositories/user_repo";

export interface AlterarUsuarioRequest{
    novoNome?: string;
    novoSenha?: string;
    confirmaSenha?: string;
}

export class AlterarUsuarioCommand{
    constructor(private userRepositorio: UserRepo){}

    async execute(id:number, request: AlterarUsuarioRequest): Promise<Usuario>{
        if (request.novoSenha && request.confirmaSenha && request.novoSenha !== request.confirmaSenha) {
            throw new Error("As senhas não conferem.");
        }

        const novoUsuario: Usuario = await this.userRepositorio.updateUser(id ,{novoNome: request.novoNome, novoSenha: request.novoSenha, confirmaSenha: request.confirmaSenha});
        return novoUsuario;
    }
}