import { Request, Response } from "express";
import { QuizLogic } from "../../aplication/quiz_logic";
import { ObterQuizCommand } from "../../aplication/useCasesQuiz/obter_quiz.command";
import { ObterPerguntaCommand } from "../../aplication/useCasesQuiz/obter_pergunta.command";

export class QuizController{
    constructor(private obterQuizCommand: ObterQuizCommand, private obterPerguntaCommand: ObterPerguntaCommand){}

    public obterQuiz = async (req: Request, res: Response) => {
        try{
            res.status(200).json(this.obterQuizCommand.execute());
        }catch(error: any){
            res.status(404).json({
                message: "Erro ao obter quiz.",
                error: error.message,
            });
        }
    }

    public obterPergunta = async (req: Request, res: Response) => {
        const idPergunta = Number(req.params.idPergunta);
        try{
            res.status(200).json(this.obterPerguntaCommand.execute(idPergunta));
        }catch(error: any){
            res.status(404).json({
                message: "Erro ao obter pergunta.",
                error: error.message,
            });
        }
    }
}