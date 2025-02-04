import { Pergunta } from "../../domain/entities/pergunta.entity";
import { PerguntaGateway } from "../../domain/gateways/pergunta.gateway";
import { UseCase } from "../usecase";

export type ObterPerguntaInputDto = {
    id: string;
}

export type ObterPerguntaOutputDto = {
    id: string;
    indagacao: string;
    indicacao: string[];
    filtro: string;
    alternativas : string | null[];
}

export class ObterPerguntaUseCase implements UseCase<ObterPerguntaInputDto, ObterPerguntaOutputDto>{
    constructor(private perguntaRepoFirebase: PerguntaRepoFirebase){}

    public create(perguntaRepoFirebase: PerguntaRepoFirebase): ObterPerguntaUseCase{
        return new ObterPerguntaUseCase(perguntaRepoFirebase);
    }

    async execute({id} :ObterPerguntaInputDto): Promise<ObterPerguntaOutputDto>{
        const pergunta = await this.perguntaGateway.obterPergunta({id});

        const output = this.presentOutput(pergunta);

        return output;
    }

    private presentOutput(pergunta: Pergunta): ObterPerguntaOutputDto{
        return {
            id: pergunta.id;
            indagacao: pergunta.indagacao
            indicacao: pergunta.indicacao
            filtro: pergunta.alternativas;
            alternativas : pergunta.alternativas;
        }
    }
}