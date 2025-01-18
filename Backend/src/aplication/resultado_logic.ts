import { ResultadoBusca } from "../domain/entities/resultado_busca.entity";
import { ResultadoRepo } from "../domain/repositories/resultado_repo";
import { UserRepo } from "../domain/repositories/user_repo";

export class ResultadoLogic{

    private repositorioResultado! : ResultadoRepo;
    private repositorioUsuario! : UserRepo;

    public async preencherResult(idUser: number,idResultado: number, respostas : string[]): Promise<ResultadoBusca>{
        //chamar api plantas
        let plantas:JsonWebKey = {};

        let resultado = await this.repositorioResultado.atualizarResultado(idResultado,plantas);
        this.repositorioUsuario.adicionarResultado(resultado);

        return resultado;
    }

    public async obterResult(idResult: number): Promise<ResultadoBusca>{
        let resultado = this.repositorioResultado.obterResultado(idResult);
        return resultado;
    }

    public async deletarResult(idResult: number): Promise<string>{
        if(await this.repositorioResultado.deletarResultado(idResult)){
            return 'apagado com sucesso'
        }

        return 'erro ao apagar'; 
    }
}