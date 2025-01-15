import { ResultadoBusca } from "../domain/models/resultado_busca.model";
import { Resultado_repo } from "../domain/repositories/resultado_repo";
import { User_repo } from "../domain/repositories/user_repo";

export class Resultado_logic{

    private repositorio_resultado! : Resultado_repo;
    private repositorio_usuario! : User_repo;

    preencher_result(id_user: number,id_resultado: number, respostas : string[]): ResultadoBusca{
        //chamar api plantas
        let plantas:JsonWebKey = {};

        let resultado = this.repositorio_resultado.atualizar_resultado(id_resultado,plantas);
        this.repositorio_usuario.adicionar_resultado(resultado);

        return resultado;
    }

    obter_result(id_result: number): ResultadoBusca{

        let resultado = this.repositorio_resultado.obter_resultado(id_result);
        return resultado;
    }

    deletar_result(id_result: number):string{
        if(this.repositorio_resultado.delete_resultado(id_result)){
            return 'apagado com sucesso'
        }else{
           return 'erro ao apagar'; 
        }
        
    }

}