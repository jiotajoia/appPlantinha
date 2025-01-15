import { Application, Request, Response } from "express";
import { UserLogic } from "../../aplication/user_logic";

export class UserRoutes{
    app: Application;
    rota: string = '/user';

    userLogic: UserLogic = new UserLogic();

    constructor(app: Application){
        this.app = app;
        this.iniciarRotas();
    }

    iniciarRotas(): Application{
        this.app.route(this.rota)
        .post( async (req: Request, res: Response) => {
            let dados = req.body;
            let novoUsuario = this.userLogic.criarUsuario(dados);
            res.json(novoUsuario);
        })
        .get(async (req: Request, res: Response) => {
            let dados = req.body;
            let usuario = this.userLogic.obterUsuario(dados);
            res.json(usuario);
        });

        this.app.route(this.rota + '/:id')
        .delete(async (req: Request, res: Response) =>{
            let idUser = Number(req.params.id);
            let usuario = this.userLogic.deletarUsuario(idUser);
            res.json(usuario);
        })
        .patch(async (req: Request, res: Response) =>{
            let idUser = Number(req.params.id);
            let dados = req.body;
            let usuarioAlterado = this.userLogic.alterarUsuario(idUser,dados);
            res.json(usuarioAlterado);
        });

        return this.app;
    }
}