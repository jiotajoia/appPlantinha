import { Usuario } from "../../domain/entities/usuario.entity";
import { UserRepo } from "../../domain/repositories/user_repo";

export interface ObterUsuarioRequest{
    email: string;
    senha: string;
}

export class ObterUsuarioCommand{
    constructor(private userRepositorio: UserRepo){}

    async execute(request: ObterUsuarioRequest): Promise<Usuario>{
        const usuario: Usuario = await this.userRepositorio.obterUser({email: request.email, senha: request.senha});
        return usuario;
    }
}