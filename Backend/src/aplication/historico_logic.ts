import { Historico } from "../domain/models/historico.model";
import { User_repo } from "../domain/repositories/user_repo";

export class Historico_logic{
    private repositorio_user!: User_repo

    obter_historico(id_user: number):Historico{
        let historico = this.repositorio_user.obter_historico(id_user);
        return historico;
    }

    limpar_historico(id_user:number):string{
        if(this.repositorio_user.limpar_historico(id_user)){
            return 'apagado com sucesso';
        }else{
           return 'erro ao apagar'; 
        }
    }
}