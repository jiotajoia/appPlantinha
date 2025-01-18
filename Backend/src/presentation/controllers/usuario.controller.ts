import { Request, Response } from "express";
import { UserLogic } from "../../aplication/user_logic";

export class UsuarioController{
    constructor(private userLogic: UserLogic){}

    public criarUsuario = async(req: Request, res: Response) => {
        const {dados} = req.body;
        res.status(201).json({message: "Usuário criado com sucesso",data: await this.userLogic.criarUsuario(dados)});
    }

    public obterUsuario = async (req: Request, res: Response) => {
        const {email, senha} = req.body;
        res.status(200).json({message: "Usuário obtido com sucesso",data: await this.userLogic.obterUsuario({email, senha})});
    }

    public deletarUsuario = async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        res.status(200).json({message: "Usuário deletado com sucesso",data:await this.userLogic.deletarUsuario(id)});
    }

    public alterarUsuario = async(req: Request, res: Response ) => {
        const id = Number(req.params.id);
        const {dados} = req.body;

        res.status(200).json({message: "Usuário atualizado com sucesso",data:await this.userLogic.alterarUsuario(id, dados)});
    }
}