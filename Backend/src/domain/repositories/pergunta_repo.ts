import { Pergunta } from "../entities/pergunta.entity";

export interface PerguntaRepo{
    obterPergunta(idPergunta: number): Promise<Pergunta>;
}