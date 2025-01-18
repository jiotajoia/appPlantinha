import { Request, Response } from "express";
import { QuizLogic } from "../../aplication/quiz_logic";

export class QuizController{
    constructor(private quizLogic: QuizLogic){}

    public obterQuiz = async (req: Request, res: Response) => {
        try{
            res.status(200).json(this.quizLogic.obterQuiz());
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
            res.status(200).json(this.quizLogic.obterPergunta(idPergunta));
        }catch(error: any){
            res.status(404).json({
                message: "Erro ao obter pergunta.",
                error: error.message,
            });
        }
    }
}