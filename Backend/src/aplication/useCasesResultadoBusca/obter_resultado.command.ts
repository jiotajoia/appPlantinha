import { ResultadoBusca } from "../../domain/entities/resultado_busca.entity";
import { ResultadoRepo } from "../../domain/repositories/resultado_repo";

export class ObterResultadoCommand{
    constructor(private resultRespositorio: ResultadoRepo){}

    async execute(idResultado: number): Promise<ResultadoBusca>{
        let resultado = this.resultRespositorio.obterResultado(idResultado);
        return resultado;
    }
}