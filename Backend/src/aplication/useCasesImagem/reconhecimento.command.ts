import { ResultadoBusca } from "../../domain/entities/resultado_busca.entity";
import { ResultadoRepo } from "../../domain/repositories/resultado_repo";
import { UserRepo } from "../../domain/repositories/user_repo";

export class ReconhecimentoCommand{
    constructor(private repositorioResult: ResultadoRepo, private repositorioUser: UserRepo){}

    async execute(idUser: number, imagem: any): Promise<ResultadoBusca>{
        let plantas = {};
        let resultado = await this.repositorioResult.criarResultado(plantas,'imagem');
        this.repositorioUser.adicionarResultado(resultado);

        return resultado;
    }
}