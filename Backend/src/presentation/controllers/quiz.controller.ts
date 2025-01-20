import { Request, Response } from "express";
import { ObterQuizUseCase } from "../../aplication/useCasesQuiz/obter_quiz.usecase";
import { ObterPerguntaUseCase } from "../../aplication/useCasesQuiz/obter_pergunta.usecase";

export class QuizController{
    constructor(private obterQuizUseCase: ObterQuizUseCase, private ObterPerguntaUseCase: ObterPerguntaUseCase){}

    public obterQuiz = async (req: Request, res: Response) => {
        try{
            res.status(200).json(this.obterQuizUseCase.execute());
        }catch(error: any){
            res.status(404).json({
                message: "Erro ao obter quiz.",
                error: error.message,
            });
        }
    }

    public obterPergunta = async (req: Request, res: Response) => {
        const id = req.params.idPergunta;
        try{
            res.status(200).json(this.ObterPerguntaUseCase.execute({id}));
        }catch(error: any){
            res.status(404).json({
                message: "Erro ao obter pergunta.",
                error: error.message,
            });
        }
    }
}