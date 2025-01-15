import { Historico } from "../domain/models/historico.model";
import { UserRepo } from "../domain/repositories/user_repo";

export class HistoricoLogic{
    private repositorioUser!: UserRepo;

    obterHistorico(idUser: number):Historico{
        let historico = this.repositorioUser.obterHistorico(idUser);
        return historico;
    }

    limparHistorico(idUser:number):string{
        if(this.repositorioUser.limparHistorico(idUser)){
            return 'apagado com sucesso';
        }
        
        return 'erro ao apagar'; 
    }
}