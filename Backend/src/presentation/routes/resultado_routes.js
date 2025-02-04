import { ResultadoBuscaController } from "../controllers/resultado_busca.controller";
import { PreencherResultadoUseCase } from "../../aplication/useCasesResultadoBusca/preencher_resultado.usecase";
import { ObterResultadoUseCase } from "../../aplication/useCasesResultadoBusca/obter_resultado.usecase";
import { DeletarResultadoUseCase } from "../../aplication/useCasesResultadoBusca/deletar_resultado.usecase";
export class ResultadoRoutes {
    app;
    rotaUserResult = `/user/:idUser/resultado/:idResultado`;
    userRepoFirebase;
    resultRepoFirebase;
    constructor(app) {
        this.app = app;
        this.iniciarRotas();
    }
    iniciarRotas() {
        const controller = new ResultadoBuscaController(new PreencherResultadoUseCase(this.userRepoFirebase, this.resultRepoFirebase), new ObterResultadoUseCase(this.resultRepoFirebase), new DeletarResultadoUseCase(this.resultRepoFirebase));
        this.app.route(this.rotaUserResult).patch(controller.preencherResult);
        this.app.route(this.rotaUserResult).get(controller.obterResult).delete(controller.deletarResult);
        return this.app;
    }
}
