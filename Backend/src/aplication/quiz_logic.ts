import { Quiz } from "../domain/models/quiz.model";
import { PerguntaRepo } from "../domain/repositories/pergunta_repo";

export class QuizLogic{
    repositorioPergunta! : PerguntaRepo
    
    obterQuiz(){
        let quiz = new Quiz();
        return quiz;
    }

    obterPergunta(idPergunta: number){
        let pergunta = this.repositorioPergunta.obterPergunta(idPergunta);
        return pergunta;
    }
}