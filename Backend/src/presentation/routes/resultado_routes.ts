import { Application, Request, Response } from "express";
import { ResultadoLogic } from "../../aplication/resultado_logic";
import { ResultadoBuscaController } from "../controllers/resultado_busca.controller";
import { UserRepo } from "../../domain/repositories/user_repo";
import { ResultadoRepo } from "../../domain/repositories/resultado_repo";
import { PreencherResultadoCommand } from "../../aplication/useCasesResultadoBusca/preencher_resultado.command";
import { ObterResultadoCommand } from "../../aplication/useCasesResultadoBusca/obter_resultado.command";
import { DeletarResultadoCommand } from "../../aplication/useCasesResultadoBusca/deletar_resultado.command";

export class ResultadoRoutes{
    app: Application;
    rotaResultado: string = '/resultado/:id';
    rotaUserResult: string = `/user/:id_user/${this.rotaResultado}`;
    userRepo!: UserRepo;
    resultRepo!: ResultadoRepo;

    constructor(app: Application){
        this.app = app;
        this.iniciarRotas();
    }

    iniciarRotas(): Application{
        const controller: ResultadoBuscaController = new ResultadoBuscaController(new PreencherResultadoCommand(this.userRepo, this.resultRepo), new ObterResultadoCommand(this.resultRepo), new DeletarResultadoCommand(this.resultRepo));
        this.app.route(this.rotaUserResult).patch(controller.preencherResult);

        this.app.route(this.rotaResultado).get(controller.obterResult).delete(controller.deletarResult);

        return this.app;
    }
}