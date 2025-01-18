import { Usuario } from "../../domain/entities/usuario.entity";
import { UserRepo } from "../../domain/repositories/user_repo";

export interface CriarUsuarioRequest{
    nome: string;
    email: string;
    senha: string;
}

export class CriarUsuarioCommand{
    constructor(private userRepositorio: UserRepo){}

    async execute(request: CriarUsuarioRequest): Promise<Usuario>{
        const novoUsuario: Usuario = await this.userRepositorio.criarUser({nome: request.nome, email: request.email, senha: request.senha});
        return novoUsuario;
    }
}