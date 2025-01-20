import { Usuario } from "../domain/entities/usuario.entity";
import { UserRepo } from "../domain/repositories/user_repo";
import { CriarUsuarioRequest } from "./useCasesUsuario/criar_usuario.usecase";

export class UserLogic{
    repositorio!: UserRepo;

    public async criarUsuario(dados: CriarUsuarioRequest): Promise<Usuario>{
        let novoUsuario = this.repositorio.criarUser(dados);
        
        return novoUsuario;
    }

    public async obterUsuario(dados: { email: string; senha: string }): Promise<Usuario>{
        let email = dados.email;
        let senha = dados.senha;
        let usuario = this.repositorio.obterUser({email: email, senha: senha});
        return usuario;
    }

    public async deletarUsuario(id: number): Promise<Usuario>{
        let usuario = this.repositorio.deleteUser(id);
        return usuario;
    }

    public async alterarUsuario(id: number, dados: any): Promise<Usuario>{
        let usuarioAlterado = this.repositorio.updateUser(id,dados);
        return usuarioAlterado;
    }
}