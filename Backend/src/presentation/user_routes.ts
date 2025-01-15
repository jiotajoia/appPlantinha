import { Application, Request, Response } from "express";
import { User_logic } from "../aplication/user_logic";

export class User_routes{
    app: Application;
    rota: string = '/user';

    user_logic = new User_logic();

    constructor(app: Application){
        this.app = app;
        this.iniciarRotas();
    }

    iniciarRotas(): Application{
        this.app.route(this.rota)
        .post( async (req: Request, res: Response) => {
            let dados = req.body;
            let novo_usuario = this.user_logic.criar_usuario(dados);
            res.json(novo_usuario);
        })
        .get(async (req: Request, res: Response) => {
            let dados = req.body;
            let usuario = this.user_logic.obter_usuario(dados);
            res.json(usuario);
        })

        this.app.route(this.rota + '/:id')
        .delete(async (req: Request, res: Response) =>{
            let id_user = Number(req.params.id);
            let usuario = this.user_logic.deletar_usuario(id_user);
            res.json(usuario);
        })
        .patch(async (req: Request, res: Response) =>{
            let id_user = Number(req.params.id);
            let dados = req.body;
            let usuario_alterado = this.user_logic.alterar_usuario(id_user,dados);
            res.json(usuario_alterado);
        })

        return this.app;
    }
}