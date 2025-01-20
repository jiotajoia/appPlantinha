import { Pergunta } from "../../domain/entities/pergunta.entity";
import { PerguntaGateway } from "../../domain/gateways/pergunta.gateway";
import { UseCase } from "../usecase";

export type ObterPerguntaInputDto = {
    id: string;
}

export type ObterPerguntaOutputDto = {
    id: string;
    indagacao: string;
    opcoes: string[];
}

export class ObterPerguntaUseCase implements UseCase<ObterPerguntaInputDto, ObterPerguntaOutputDto>{
    constructor(private perguntaGateway: PerguntaGateway){}

    public create(perguntaGateway: PerguntaGateway): ObterPerguntaUseCase{
        return new ObterPerguntaUseCase(perguntaGateway);
    }

    async execute({id} :ObterPerguntaInputDto): Promise<ObterPerguntaOutputDto>{
        const pergunta = await this.perguntaGateway.obterPergunta({id});

        const output = this.presentOutput(pergunta);

        return output;
    }

    private presentOutput(pergunta: Pergunta): ObterPerguntaOutputDto{
        return {
            id: pergunta.id,
            indagacao: pergunta.indagacao,
            opcoes: pergunta.opcoes
        }
    }
}