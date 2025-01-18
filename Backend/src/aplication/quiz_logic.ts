import { Pergunta } from "../domain/entities/pergunta.entity";
import { Quiz } from "../domain/entities/quiz.entity";
import { PerguntaRepo } from "../domain/repositories/pergunta_repo";

export class QuizLogic{
    repositorioPergunta! : PerguntaRepo
    
    public async obterQuiz(): Promise<Quiz>{
        let quiz = new Quiz();
        return quiz;
    }

    public async obterPergunta(idPergunta: number): Promise<Pergunta>{
        let pergunta = this.repositorioPergunta.obterPergunta(idPergunta);
        return pergunta;
    }
}