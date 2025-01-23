import { Request, Response } from "express";
import { PreencherResultadoUseCase } from "../../aplication/useCasesResultadoBusca/preencher_resultado.usecase";
import { ObterResultadoUseCase } from "../../aplication/useCasesResultadoBusca/obter_resultado.usecase";
import { DeletarUsuarioUseCase } from "../../aplication/useCasesUsuario/deletar_usuario.usecase";
import { DeletarResultadoUseCase } from "../../aplication/useCasesResultadoBusca/deletar_resultado.usecase";
export class ResultadoBuscaController{
    constructor( private preencherResultadoUseCase: PreencherResultadoUseCase, private obterResultadoUseCase: ObterResultadoUseCase, private deletarResultadoUseCase: DeletarResultadoUseCase){}
    
    public preencherResult = async (req: Request, res: Response) => {
        try{
            let idUser = req.params.idUser;
            let idResultado = req.params.idResultado;
            let respostas: string[] = req.body;
            res.status(200).json(this.preencherResultadoUseCase.execute({idUser, idResultado, respostas}));
        }catch(error: any){
            res.status(500).json({
                message: "Erro ao preencher resultado.",
                error: error.message,
            });
        }
    }

    public obterResult = async (req: Request, res: Response) => {
        try{
            let idUser = req.params.id_user;
            res.status(200).json(this.obterResultadoUseCase.execute({id: idUser}));
        }catch(error: any){
            res.status(404).json({
                message: "Erro ao obter resultado.",
                error: error.message,
            });
        }
    }

    public deletarResult = async (req: Request, res: Response) => {
        try{
            let idUser = req.params.id_user;
            res.status(200).json(this.deletarResultadoUseCase.execute({id: idUser}));
        }catch(error: any){
            res.status(500).json({
                message: "Erro ao deletar resultado.",
                error: error.message,
            });
        }
    }
}