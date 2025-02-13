import { Request, Response } from "express";
import { ObterResultadoUseCase } from "../../aplication/useCasesResultadoBusca/obter_resultado.usecase";
import { DeletarResultadoUseCase } from "../../aplication/useCasesResultadoBusca/deletar_resultado.usecase";
import { CriarResultadoUseCase } from "../../aplication/useCasesResultadoBusca/criar_resultado.usecase";
import { CriarResultadoMapaUseCase } from "../../aplication/useCasesResultadoBusca/criar_mapa_resultado.usecase";

export class ResultadoBuscaController{
    constructor( private criarResultadoUseCase: CriarResultadoUseCase, private criarResultadoMapaUseCase: CriarResultadoMapaUseCase, private obterResultadoUseCase: ObterResultadoUseCase, private deletarResultadoUseCase: DeletarResultadoUseCase){}
    
    public criarResultQuiz = async (req: Request, res: Response) => {
        try{
            let idUser = req.params.idUser;
            let {respostas} = req.body;
            res.status(200).json(await this.criarResultadoUseCase.execute({idUser, respostas}));
        }catch(error: any){
            res.status(500).json({
                message: "Erro ao criar resultado quiz.",
                error: error.message,
            });
        }
    }

    public criarResultMapa = async (req: Request, res: Response) => { //
        try{
            let pais = req.params.pais;
            res.status(200).json(await this.criarResultadoMapaUseCase.execute({pais}));
        }catch(error: any){
            res.status(500).json({
                message: "Erro ao criar resultado mapa.",
                error: error.message,
            });
        }
    }

    public obterResult = async (req: Request, res: Response) => {
        try{
            let idUser = req.params.idUser;
            let idResultado = req.params.idResultado
            res.status(200).json(await this.obterResultadoUseCase.execute({idUser, idResultado}));
        }catch(error: any){
            res.status(404).json({
                message: "Erro ao obter resultado.",
                error: error.message,
            });
        }
    }

    public deletarResult = async (req: Request, res: Response) => {
        try{
            let idUser = req.params.idUser;
            let idResultado = req.params.idResultado
            res.status(200).json(await this.deletarResultadoUseCase.execute({idUser, idResultado}));
        }catch(error: any){
            res.status(500).json({
                message: "Erro ao deletar resultado.",
                error: error.message,
            });
        }
    }
}