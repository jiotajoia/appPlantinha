import { Pergunta } from "../../domain/entities/pergunta.entity";
import { Quiz } from "../../domain/entities/quiz.entity";
import { ResultadoBusca } from "../../domain/entities/resultado_busca.entity";

export class ObterQuizCommand{
    async execute(): Promise<Quiz>{
        let idQuiz: number = 0;
        let resultado: ResultadoBusca = new ResultadoBusca(0, "03-09-2004", "quiz", []);
        let perguntas: Pergunta[] = [];
        let quiz = new Quiz(idQuiz, perguntas, resultado);
        return quiz;
    }
}