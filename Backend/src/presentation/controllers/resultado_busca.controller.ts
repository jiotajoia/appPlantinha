import { Request, Response } from "express";
import { ResultadoLogic } from "../../aplication/resultado_logic";

export class ResultadoBuscaController{
    constructor(private resultadoBuscaLogic: ResultadoLogic){}

    public preencherResult = async (req: Request, res: Response) => {
        let idUser = Number(req.params.idUser);
        let idResult = Number(req.params.idResultado);
        let respostas: string[] = req.body;
        res.status(200).json(this.resultadoBuscaLogic.preencherResult(idUser, idResult, respostas));
    }

    public obterResult = async (req: Request, res: Response) => {
        let idUser = Number(req.params.id_user);
        res.status(200).json(this.resultadoBuscaLogic.obterResult(idUser));
    }

    public deletarResult = async (req: Request, res: Response) => {
        let idUser = Number(req.params.id_user);
        res.status(200).json(this.resultadoBuscaLogic.deletarResult(idUser));
    }


}