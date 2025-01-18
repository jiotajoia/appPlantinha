import { Historico } from "../../domain/entities/historico.entity";
import { UserRepo } from "../../domain/repositories/user_repo";

export class ObterHistoricoCommand{
    constructor(private userRepositorio: UserRepo){}

    async execute(idUser:number): Promise<Historico>{
        const historico = this.userRepositorio.obterHistorico(idUser);
        return historico;
    }
}