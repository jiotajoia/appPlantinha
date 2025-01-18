import { Request, Response } from "express";
import { HistoricoLogic } from "../../aplication/historico_logic";

export class HistoricoController{
    constructor(private historicoLogic: HistoricoLogic){}

    public obterHistorico = async (req: Request, res: Response) => {
        try{
            const id = Number(req.params.id);
            res.status(200).json(this.historicoLogic.obterHistorico(id));
        }catch(error: any){
            res.status(404).json({
                message: "Histórico não encontrado.",
                error: error.message,
            });
        }
    }

    public limparHistorico = async (req: Request, res: Response) => {
        try{
            const id = Number(req.params.id);
            res.status(200).json(this.historicoLogic.limparHistorico(id));
        }catch(error: any){
            res.status(500).json({
                message: "Erro ao limpar histórico.",
                error: error.message,
            });
        }
    }
}