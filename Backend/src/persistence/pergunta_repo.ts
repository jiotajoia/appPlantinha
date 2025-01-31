import { ObterPerguntaInputDto } from "../aplication/useCasesQuiz/obter_pergunta.usecase";
import { Pergunta } from "../domain/entities/pergunta.entity";
import { PerguntaGateway } from "../domain/gateways/pergunta.gateway";

export class PerguntaRepoFirebase implements PerguntaGateway{
    obterPergunta(dados: ObterPerguntaInputDto): Promise<Pergunta> {
        throw new Error("Method not implemented.");
    }

}