import { Historico } from "../domain/entities/historico.entity";
import { UserRepo } from "../domain/repositories/user_repo";

export class HistoricoLogic{
    private repositorioUser!: UserRepo;

    public async obterHistorico(idUser: number): Promise<Historico>{
        let historico = this.repositorioUser.obterHistorico(idUser);
        return historico;
    }

    public async limparHistorico(idUser:number): Promise<string>{
        if(this.repositorioUser.limparHistorico(idUser)){
            return 'apagado com sucesso';
        }
        
        return 'erro ao apagar'; 
    }
}