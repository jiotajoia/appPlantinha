import { Application} from "express";
import { HistoricoController } from "../controllers/historico.controller";
import { LimparHistoricoUseCase } from "../../aplication/useCasesHistorico/limpar_historico.usecase";
import { ObterHistoricoUseCase } from "../../aplication/useCasesHistorico/obter_historico.usecase";
import { UserRepoFirebase } from "../../persistence/user_repo_firebase";

export class HistoricoRoutes{
    app: Application;
    rotaHistorico: string = '/user/:id/historico';
    userRepoFirebase: UserRepoFirebase = new UserRepoFirebase();

    constructor(app: Application){
        this.app = app;
        this.iniciarRotas();
    }

    iniciarRotas(): Application{
        const controller: HistoricoController = new HistoricoController(new LimparHistoricoUseCase(this.userRepoFirebase), new ObterHistoricoUseCase(this.userRepoFirebase));
        this.app.route(this.rotaHistorico).get(controller.obterHistorico).patch(controller.limparHistorico);

        return this.app;
    }
}