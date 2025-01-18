import { Request, Response } from "express";
import { QuizLogic } from "../../aplication/quiz_logic";

export class QuizController{
    constructor(private quizLogic: QuizLogic){}

    public obterQuiz = async (req: Request, res: Response) => {
        res.status(200).json(this.quizLogic.obterQuiz());
    }

    public obterPergunta = async (req: Request, res: Response) => {
        const idPergunta = Number(req.params.idPergunta);

        res.status(200).json(this.quizLogic.obterPergunta(idPergunta));
    }
}