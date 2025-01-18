import { Request, Response } from "express";
import { PreencherResultadoCommand } from "../../aplication/useCasesResultadoBusca/preencher_resultado.command";
import { ObterResultadoCommand } from "../../aplication/useCasesResultadoBusca/obter_resultado.command";
import { DeletarResultadoCommand } from "../../aplication/useCasesResultadoBusca/deletar_resultado.command";

export class ResultadoBuscaController{
    constructor(private preencherResultadoCommand: PreencherResultadoCommand, private obterResultadoCommand: ObterResultadoCommand, private deletarResultadoCommand: DeletarResultadoCommand){}

    public preencherResult = async (req: Request, res: Response) => {
        try{
            let idUser = Number(req.params.idUser);
            let idResult = Number(req.params.idResultado);
            let respostas: string[] = req.body;
            res.status(200).json(this.preencherResultadoCommand.execute(idUser, idResult, respostas));
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
            res.status(200).json(this.obterResultadoCommand.execute(idUser));
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
            res.status(200).json(this.deletarResultadoCommand.execute(idUser));
        }catch(error: any){
            res.status(500).json({
                message: "Erro ao deletar resultado.",
                error: error.message,
            });
        }
    }
}