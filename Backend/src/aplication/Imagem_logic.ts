import { ResultadoBusca } from "../domain/models/resultado_busca.model";
import { Resultado_repo } from "../domain/repositories/resultado_repo";
import { User_repo } from "../domain/repositories/user_repo";

export class Imagem_logic{
    private repositorio_result!: Resultado_repo
    private repositorio_user!: User_repo

    reconhecimento(id_user:number,imagem) : ResultadoBusca{
       //reconhecimento por imagem 
        let plantas = {};
        let resultado = this.repositorio_result.criar_resultado(plantas,'imagem');
        this.repositorio_user.adicionar_resultado(resultado);

        return resultado;
    }
    
}