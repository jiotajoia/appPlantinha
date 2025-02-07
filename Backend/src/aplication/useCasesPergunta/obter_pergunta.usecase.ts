import { Pergunta } from "../../domain/entities/pergunta.entity";
import { PerguntaRepoFirebase } from "../../persistence/pergunta_repo";
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
        return await this.perguntaRepoFirebase.obterPergunta({id});
    }

}