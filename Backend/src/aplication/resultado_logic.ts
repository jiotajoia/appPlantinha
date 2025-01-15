import { ResultadoBusca } from "../domain/entities/resultado_busca.entity";
import { ResultadoRepo } from "../domain/repositories/resultado_repo";
import { UserRepo } from "../domain/repositories/user_repo";

export class ResultadoLogic{

    private repositorioResultado! : ResultadoRepo;
    private repositorioUsuario! : UserRepo;

    preencherResult(idUser: number,idResultado: number, respostas : string[]): ResultadoBusca{
        //chamar api plantas
        let plantas:JsonWebKey = {};

        let resultado = this.repositorioResultado.atualizarResultado(idResultado,plantas);
        this.repositorioUsuario.adicionarResultado(resultado);

        return resultado;
    }

    obterResult(idResult: number): ResultadoBusca{
        let resultado = this.repositorioResultado.obterResultado(idResult);
        return resultado;
    }

    deletarResult(idResult: number):string{
        if(this.repositorioResultado.deleteResultado(idResult)){
            return 'apagado com sucesso'
        }

        return 'erro ao apagar'; 
    }
}