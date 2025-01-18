import { ResultadoBusca } from "../../domain/entities/resultado_busca.entity";
import { ResultadoRepo } from "../../domain/repositories/resultado_repo";

export class DeletarResultadoCommand{
    constructor(private resultRespositorio: ResultadoRepo){}

    async execute(idResultado: number): Promise<string>{
        let mensagem = this.resultRespositorio.deletarResultado(idResultado);
        return mensagem;
    }
}