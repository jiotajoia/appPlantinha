import { Usuario } from "../../domain/entities/usuario.entity";
import { UserRepo } from "../../domain/repositories/user_repo";

export class DeletarUsuarioCommand{
    constructor(private userRepositorio: UserRepo){}

    async execute(id: number): Promise<Usuario>{
        const usuario: Usuario = await this.userRepositorio.deleteUser(id);
        return usuario;
    }
}