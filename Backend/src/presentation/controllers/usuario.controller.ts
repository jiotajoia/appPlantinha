import { Request, Response } from "express";
import { CriarUsuarioUseCase } from "../../aplication/useCasesUsuario/criar_usuario.usecase";
import { ObterUsuarioUseCase } from "../../aplication/useCasesUsuario/obter_usuario.usecase";
import { DeletarUsuarioUseCase } from "../../aplication/useCasesUsuario/deletar_usuario.usecase";
import { AlterarUsuarioUseCase } from "../../aplication/useCasesUsuario/alterar_usuario.usecase";

export class UsuarioController{
    constructor(private criarUsuarioUseCase: CriarUsuarioUseCase, private obterUsuarioUseCase: ObterUsuarioUseCase, private deletarUsuarioUseCase: DeletarUsuarioUseCase, private alterarUsuarioUseCase: AlterarUsuarioUseCase){}

    public criarUsuario = async(req: Request, res: Response) => {
        try{
            const {nome, email, senha} = req.body;
            res.status(201).json({message: "Usuário criado com sucesso",data: await this.criarUsuarioUseCase.execute({nome, email, senha})});
        }catch(error: any){
            res.status(500).json({
                message: "Erro ao criar usuário.",
                error: error.message,
            });
        }
    }

    public obterUsuario = async (req: Request, res: Response) => {
        try{
            const {email, senha} = req.body;
            res.status(200).json({message: "Usuário obtido com sucesso",data: await this.obterUsuarioUseCase.execute({email, senha})});
        }catch(error: any){
            res.status(404).json({
                message: "Erro ao obter usuário.",
                error: error.message,
            });
        }
    }

    public deletarUsuario = async (req: Request, res: Response) => {
        try{
            const id = req.params.id;
            res.status(200).json({message: "Usuário deletado com sucesso",data:await this.deletarUsuarioUseCase.execute({id})});
        }catch(error: any){
            res.status(500).json({
                message: "Erro ao deletar usuário.",
                error: error.message,
            });
        }
    }

    public alterarUsuario = async(req: Request, res: Response ) => {
        try{
            const id = req.params.id;
            const {novoNome, novoSenha, confirmaSenha} = req.body;
            res.status(200).json({message: "Usuário atualizado com sucesso",data:await this.alterarUsuarioUseCase.execute({id, novoNome, novoSenha, confirmaSenha})});
        }catch(error: any){
            res.status(500).json({
                message: "Erro ao alterar usuário.",
                error: error.message,
            });
        }
    }
}