import { Pergunta } from "../domain/entities/pergunta.entity";
import { Quiz } from "../domain/entities/quiz.entity";
import { ResultadoBusca } from "../domain/entities/resultado_busca.entity";
import { PerguntaRepo } from "../domain/repositories/pergunta_repo";
import { ResultadoRepo } from "../domain/repositories/resultado_repo";

export class QuizLogic{
    repositorioPergunta! : PerguntaRepo;
    repositorioResultado!: ResultadoRepo;
    
    public async obterQuiz(): Promise<Quiz>{
        let idQuiz: number = 0;
        let resultado: ResultadoBusca = new ResultadoBusca(0, "03-09-2004", "quiz", []);
        let perguntas: Pergunta[] = [];
        let quiz = new Quiz(idQuiz, perguntas, resultado);
        return quiz;
    }

    public async obterPergunta(idPergunta: number): Promise<Pergunta>{
        let pergunta = this.repositorioPergunta.obterPergunta(idPergunta);
        return pergunta;
    }
}