import { Application} from "express";
import { HistoricoController } from "../controllers/historico.controller";
import { UserGateway } from "../../domain/gateways/user.gateway";
import { LimparHistoricoUseCase } from "../../aplication/useCasesHistorico/limpar_historico.usecase";
import { ObterHistoricoUseCase } from "../../aplication/useCasesHistorico/obter_historico.usecase";

export class HistoricoRoutes{
    app: Application;
    rotaHistorico: string = '/user/:id/historico';
    userGateway!: UserGateway;

    constructor(app: Application){
        this.app = app;
        this.iniciarRotas();
    }

    iniciarRotas(): Application{
        const controller: HistoricoController = new HistoricoController(new LimparHistoricoUseCase(this.userGateway), new ObterHistoricoUseCase(this.userGateway));
        this.app.route(this.rotaHistorico).get(controller.obterHistorico).delete(controller.limparHistorico)

        return this.app;
    }
}