import { ResultadoBuscaController } from "../controllers/resultado_busca.controller.js";
import { ObterResultadoUseCase } from "../../aplication/useCasesResultadoBusca/obter_resultado.usecase.js";
import { DeletarResultadoUseCase } from "../../aplication/useCasesResultadoBusca/deletar_resultado.usecase.js";
import { CriarResultadoUseCase } from "../../aplication/useCasesResultadoBusca/criar_resultado.usecase.js";
export class ResultadoRoutes {
    app;
    rotaResult = `/user/:idUser/resultado`;
    rotaUserResult = `/user/:idUser/resultado/:idResultado`;
    userRepoFirebase;
    resultRepoFirebase;
    constructor(app) {
        this.app = app;
        this.iniciarRotas();
    }
    iniciarRotas() {
        const controller = new ResultadoBuscaController(new CriarResultadoUseCase(this.userRepoFirebase, this.resultRepoFirebase), new ObterResultadoUseCase(this.resultRepoFirebase), new DeletarResultadoUseCase(this.resultRepoFirebase));
        this.app.route(this.rotaResult).post(controller.preencherResult);
        this.app.route(this.rotaUserResult).get(controller.obterResult).delete(controller.deletarResult);
        return this.app;
    }
}
