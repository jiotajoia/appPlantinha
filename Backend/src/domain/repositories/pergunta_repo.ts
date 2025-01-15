import { Pergunta } from "../models/pergunta.model";

export interface PerguntaRepo{
    obterPergunta(idPergunta: number): Pergunta;
}