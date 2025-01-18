import { Request, Response } from "express";
import { HistoricoLogic } from "../../aplication/historico_logic";
import { LimparHistoricoCommand } from "../../aplication/useCasesHistorico/limpar_historico.command";
import { ObterHistoricoCommand } from "../../aplication/useCasesHistorico/obter_historico.command";

export class HistoricoController{
    constructor(private limparHistoricoCommand: LimparHistoricoCommand, private obterHistoricoCommand: ObterHistoricoCommand){}

    public obterHistorico = async (req: Request, res: Response) => {
        try{
            const id = Number(req.params.id);
            res.status(200).json(this.obterHistoricoCommand.execute(id));
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
            res.status(200).json(this.limparHistoricoCommand.execute(id));
        }catch(error: any){
            res.status(500).json({
                message: "Erro ao limpar histórico.",
                error: error.message,
            });
        }
    }
}