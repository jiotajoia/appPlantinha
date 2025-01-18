import { Request, Response } from "express";
import { ResultadoLogic } from "../../aplication/resultado_logic";

export class ResultadoBuscaController{
    constructor(private resultadoBuscaLogic: ResultadoLogic){}

    public preencherResult = async (req: Request, res: Response) => {
        try{
            let idUser = Number(req.params.idUser);
            let idResult = Number(req.params.idResultado);
            let respostas: string[] = req.body;
            res.status(200).json(this.resultadoBuscaLogic.preencherResult(idUser, idResult, respostas));
        }catch(error: any){
            res.status(500).json({
                message: "Erro ao preencher resultado.",
                error: error.message,
            });
        }
    }

    public obterResult = async (req: Request, res: Response) => {
        try{
            let idUser = Number(req.params.id_user);
            res.status(200).json(this.resultadoBuscaLogic.obterResult(idUser));
        }catch(error: any){
            res.status(404).json({
                message: "Erro ao obter resultado.",
                error: error.message,
            });
        }
    }

    public deletarResult = async (req: Request, res: Response) => {
        try{
            let idUser = Number(req.params.id_user);
            res.status(200).json(this.resultadoBuscaLogic.deletarResult(idUser));
        }catch(error: any){
            res.status(500).json({
                message: "Erro ao deletar resultado.",
                error: error.message,
            });
        }
    }
}