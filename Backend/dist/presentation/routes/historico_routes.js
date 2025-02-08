import { HistoricoController } from "../controllers/historico.controller.js";
import { LimparHistoricoUseCase } from "../../aplication/useCasesHistorico/limpar_historico.usecase.js";
import { ObterHistoricoUseCase } from "../../aplication/useCasesHistorico/obter_historico.usecase.js";
import { UserRepoFirebase } from "../../persistence/user_repo_firebase.js";
export class HistoricoRoutes {
    app;
    rotaHistorico = '/user/:id/historico';
    userRepoFirebase = new UserRepoFirebase();
    constructor(app) {
        this.app = app;
        this.iniciarRotas();
    }
    iniciarRotas() {
        const controller = new HistoricoController(new LimparHistoricoUseCase(this.userRepoFirebase), new ObterHistoricoUseCase(this.userRepoFirebase));
        this.app.route(this.rotaHistorico).get(controller.obterHistorico).patch(controller.limparHistorico);
        return this.app;
    }
}
