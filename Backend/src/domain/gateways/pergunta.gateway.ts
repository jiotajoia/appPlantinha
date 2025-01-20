import { Pergunta } from "../entities/pergunta.entity";

export interface PerguntaGateway{
    obterPergunta(idPergunta: number): Promise<Pergunta>;
}