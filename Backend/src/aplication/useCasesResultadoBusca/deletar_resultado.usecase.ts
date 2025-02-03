import { ResultadoGateway } from "../../domain/gateways/resultado.gateway";
import { ResultRepoFirebase } from "../../persistence/result_repo_firebase";
import { UseCase } from "../usecase";

export type DeletarResultadoInputDto = {
    idUser: string;
    idResultado: string;
}

export type DeletarResultadoOutputDto = {
    mensagem: string;
}

export class DeletarResultadoUseCase implements UseCase<DeletarResultadoInputDto, DeletarResultadoOutputDto>{
    constructor(private resultRepoFirebase: ResultRepoFirebase){}

    public create(resultRepoFirebase: ResultRepoFirebase){
        return new DeletarResultadoUseCase(resultRepoFirebase);
    }

    async execute({idUser, idResultado}: DeletarResultadoInputDto): Promise<DeletarResultadoOutputDto>{
        let mensagem = await this.resultRepoFirebase.deletarResultado({idUser, idResultado});
        return mensagem;
    }
}