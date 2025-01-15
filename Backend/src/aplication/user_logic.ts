import { Usuario } from "../domain/models/usuario.model";
import { User_repo } from "../domain/repositories/user_repo";

export class User_logic{
    repositorio!: User_repo;


    criar_usuario(dados){
        let novo_usuario = this.repositorio.criar_user();
        
        return novo_usuario;
    }

    obter_usuario(dados: { email: string; senha: string }){
        let email = dados.email;
        let senha = dados.senha;
        let usuario = this.repositorio.obter_user(email,senha);
        return usuario;
    }

    deletar_usuario(id: number){
        let usuario = this.repositorio.delete_user(id);
        return usuario;
    }
    alterar_usuario(id: number, dados){
        let usuario_alterado = this.repositorio.update_user(id,dados);
        return usuario_alterado;
    }
}