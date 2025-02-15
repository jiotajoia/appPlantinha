import { Request, Response } from "express";
import { LimparHistoricoUseCase } from "../../aplication/useCasesHistorico/limpar_historico.usecase";
import { ObterHistoricoUseCase } from "../../aplication/useCasesHistorico/obter_historico.usecase";

export class HistoricoController{
    constructor(private limparHistoricoUseCase: LimparHistoricoUseCase, private obterHistoricoUseCase: ObterHistoricoUseCase){}

    public obterHistorico = async (req: Request, res: Response) => {
        try{
            const id = req.params.id;
            res.status(200).json(this.obterHistoricoUseCase.execute({idUser: id}));
        }catch(error: any){
            res.status(404).json({
                message: "Histórico não encontrado.",
                error: error.message,
            });
        }
    }

    public limparHistorico = async (req: Request, res: Response) => {
        try{
            const id = req.params.id;
            res.status(200).json(this.limparHistoricoUseCase.execute({idUser: id}));
        }catch(error: any){
            res.status(404).json({
                message: "Erro ao limpar histórico.",
                error: error.message,
            });
        }
    }
}