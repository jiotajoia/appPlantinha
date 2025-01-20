import { ObterPerguntaInputDto } from "../../aplication/useCasesQuiz/obter_pergunta.usecase";
import { Pergunta } from "../entities/pergunta.entity";

export interface PerguntaGateway{
    obterPergunta(dados: ObterPerguntaInputDto): Promise<Pergunta>;
}