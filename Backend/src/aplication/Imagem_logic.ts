import { ResultadoBusca } from "../domain/entities/resultado_busca.entity";
import { ResultadoRepo } from "../domain/repositories/resultado_repo";
import { UserRepo as UserRepo } from "../domain/repositories/user_repo";

export class ImagemLogic{
    private repositorioResult!: ResultadoRepo;
    private repositorioUser!: UserRepo;

    public async reconhecimento(idUser: number, imagem): Promise<ResultadoBusca>{
       //reconhecimento por imagem 
        let plantas = {};
        let resultado = this.repositorioResult.criarResultado(plantas,'imagem');
        this.repositorioUser.adicionarResultado(resultado);

        return resultado;
    }
    
}