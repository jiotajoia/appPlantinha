import { ResultadoBusca } from "../../domain/entities/resultado_busca.entity";
import { ResultadoRepo } from "../../domain/repositories/resultado_repo";
import {UserRepo} from "../../domain/repositories/user_repo";

export class PreencherResultadoCommand{
    constructor(private userRepositorio: UserRepo, private resultRespositorio: ResultadoRepo){}

    async execute(idUser: number,idResultado: number, respostas : string[]): Promise<ResultadoBusca>{
        let plantas:JsonWebKey = {};

        let resultado = await this.resultRespositorio.atualizarResultado(idResultado,plantas);
        this.userRepositorio.adicionarResultado(resultado);

        return resultado;
    }
}