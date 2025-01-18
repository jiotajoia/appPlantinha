import { Application, Request, Response } from "express";
import { HistoricoLogic } from "../../aplication/historico_logic";
import { HistoricoController } from "../controllers/historico.controller";
import { LimparHistoricoCommand } from "../../aplication/useCasesHistorico/limpar_historico.command";
import { UserRepo } from "../../domain/repositories/user_repo";
import { ObterHistoricoCommand } from "../../aplication/useCasesHistorico/obter_historico.command";

export class HistoricoRoutes{
    app: Application;
    rotaHistorico: string = '/user/:id/historico';
    repositorio!: UserRepo;

    constructor(app: Application){
        this.app = app;
        this.iniciarRotas();
    }

    iniciarRotas(): Application{
        const controller: HistoricoController = new HistoricoController(new LimparHistoricoCommand(this.repositorio), new ObterHistoricoCommand(this.repositorio));
        this.app.route(this.rotaHistorico).get(controller.obterHistorico).delete(controller.limparHistorico)

        return this.app;
    }
}