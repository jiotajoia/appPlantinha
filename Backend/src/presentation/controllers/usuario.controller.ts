import { Request, Response } from "express";
import { AlterarUsuarioCommand } from "../../aplication/useCasesUsuario/alterar_usuario.command";
import { ObterUsuarioCommand } from "../../aplication/useCasesUsuario/obter_usuario.command";
import { DeletarUsuarioCommand } from "../../aplication/useCasesUsuario/deletar_usuario.command";
import { CriarUsuarioCommand } from "../../aplication/useCasesUsuario/criar_usuario.command";

export class UsuarioController{
    constructor(private criarUsuarioCommand: CriarUsuarioCommand, private obterUsuarioCommand: ObterUsuarioCommand, private deletarUsuarioCommand: DeletarUsuarioCommand, private alterarUsuarioCommand: AlterarUsuarioCommand){}

    public criarUsuario = async(req: Request, res: Response) => {
        try{
            const {dados} = req.body;
            res.status(201).json({message: "Usuário criado com sucesso",data: await this.criarUsuarioCommand.execute(dados)});
        }catch(error: any){
            res.status(500).json({
                message: "Erro ao criar usuário.",
                error: error.message,
            });
        }
    }

    public obterUsuario = async (req: Request, res: Response) => {
        try{
            const {dados} = req.body;
            res.status(200).json({message: "Usuário obtido com sucesso",data: await this.obterUsuarioCommand.execute(dados)});
        }catch(error: any){
            res.status(404).json({
                message: "Erro ao obter usuário.",
                error: error.message,
            });
        }
    }

    public deletarUsuario = async (req: Request, res: Response) => {
        try{
            const id = Number(req.params.id);
            res.status(200).json({message: "Usuário deletado com sucesso",data:await this.deletarUsuarioCommand.execute(id)});
        }catch(error: any){
            res.status(500).json({
                message: "Erro ao deletar usuário.",
                error: error.message,
            });
        }
    }

    public alterarUsuario = async(req: Request, res: Response ) => {
        try{
            const id = Number(req.params.id);
            const {dados} = req.body;
            res.status(200).json({message: "Usuário atualizado com sucesso",data:await this.alterarUsuarioCommand.execute(id, dados)});
        }catch(error: any){
            res.status(500).json({
                message: "Erro ao alterar usuário.",
                error: error.message,
            });
        }
    }
}