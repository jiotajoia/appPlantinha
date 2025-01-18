import { Request, Response } from "express";
import { UserLogic } from "../../aplication/user_logic";

export class UsuarioController{
    constructor(private userLogic: UserLogic){}

    public criarUsuario = async(req: Request, res: Response) => {
        try{
            const {dados} = req.body;
            res.status(201).json({message: "Usuário criado com sucesso",data: await this.userLogic.criarUsuario(dados)});
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
            res.status(200).json({message: "Usuário obtido com sucesso",data: await this.userLogic.obterUsuario({email, senha})});
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
            res.status(200).json({message: "Usuário deletado com sucesso",data:await this.userLogic.deletarUsuario(id)});
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
            res.status(200).json({message: "Usuário atualizado com sucesso",data:await this.userLogic.alterarUsuario(id, dados)});
        }catch(error: any){
            res.status(500).json({
                message: "Erro ao alterar usuário.",
                error: error.message,
            });
        }
    }
}