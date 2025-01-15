import { Quiz } from "../domain/models/quiz.model";
import { Pergunta_repo } from "../domain/repositories/pergunta_repo";

export class Quiz_logic{
    
    repo_pergunta! : Pergunta_repo
    obter_quiz(){
        let quiz = new Quiz();
        return quiz;
    }

    obter_pergunta(id_pergunta: number){
        let pergunta = this.repo_pergunta.obter_pergunta(id_pergunta);
        return pergunta;
    }
}