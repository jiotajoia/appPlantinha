import { Request, Response } from "express";
import { HistoricoLogic } from "../../aplication/historico_logic";

export class HistoricoController{
    constructor(private historicoLogic: HistoricoLogic){}

    public obterHistorico = async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        res.status(200).json(this.historicoLogic.obterHistorico(id));
    }

    public limparHistorico = async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        res.status(200).json(this.historicoLogic.limparHistorico(id));
    }
}