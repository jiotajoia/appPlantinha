import { Request, Response } from "express";
import { ObterPerguntaUseCase } from "../../aplication/useCasesPergunta/obter_pergunta.usecase";

export class QuizController{
    constructor(private ObterPerguntaUseCase: ObterPerguntaUseCase){}

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