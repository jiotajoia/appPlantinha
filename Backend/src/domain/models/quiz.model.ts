import { Pergunta } from "./pergunta.model";
import { ResultadoBusca } from "./resultado_busca.model";

export class Quiz{
    idQuiz: number;
    perguntas: Pergunta[];
    resultado: ResultadoBusca;

    constructor(idQuiz: number, perguntas: Pergunta[], resultado: ResultadoBusca){
        this.idQuiz = idQuiz;
        this.perguntas = perguntas;
        this.resultado = resultado;
    }
}