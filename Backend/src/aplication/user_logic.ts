import { Usuario } from "../domain/entities/usuario.entity";
import { UserRepo } from "../domain/repositories/user_repo";

export class UserLogic{
    repositorio!: UserRepo;

    criarUsuario(dados): Usuario{
        let novoUsuario = this.repositorio.criarUser();
        
        return novoUsuario;
    }

    obterUsuario(dados: { email: string; senha: string }): Usuario{
        let email = dados.email;
        let senha = dados.senha;
        let usuario = this.repositorio.obterUser(email,senha);
        return usuario;
    }

    deletarUsuario(id: number): Usuario{
        let usuario = this.repositorio.deleteUser(id);
        return usuario;
    }

    alterarUsuario(id: number, dados): Usuario{
        let usuarioAlterado = this.repositorio.updateUser(id,dados);
        return usuarioAlterado;
    }
}