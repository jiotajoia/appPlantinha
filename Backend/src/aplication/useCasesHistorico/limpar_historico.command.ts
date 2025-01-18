import { UserRepo } from "../../domain/repositories/user_repo";

export class LimparHistoricoCommand{
    constructor(private userRepositorio: UserRepo){}

    async execute(idUser:number): Promise<string>{
        const mensagem = this.userRepositorio.limparHistorico(idUser);
        return mensagem;
    }
}