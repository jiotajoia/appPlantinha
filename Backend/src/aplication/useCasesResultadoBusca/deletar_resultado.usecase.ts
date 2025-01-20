import { ResultadoGateway } from "../../domain/gateways/resultado.gateway";
import { UseCase } from "../usecase";

export type DeletarResultadoInputDto = {
    id: string;
}

export type DeletarResultadoOutputDto = {
    mensagem: string;
}

export class DeletarResultadoUseCase implements UseCase<DeletarResultadoInputDto, DeletarResultadoOutputDto>{
    constructor(private resultGateway: ResultadoGateway){}

    public create(resultGateway: ResultadoGateway){
        return new DeletarResultadoUseCase(resultGateway);
    }

    async execute({id}: DeletarResultadoInputDto): Promise<DeletarResultadoOutputDto>{
        let mensagem = await this.resultGateway.deletarResultado({id});
        return {mensagem};
    }
}