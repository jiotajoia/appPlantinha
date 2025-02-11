import { ResultadoBuscaController } from "../controllers/resultado_busca.controller.js";
import { ObterResultadoUseCase } from "../../aplication/useCasesResultadoBusca/obter_resultado.usecase.js";
import { DeletarResultadoUseCase } from "../../aplication/useCasesResultadoBusca/deletar_resultado.usecase.js";
import { UserRepoFirebase } from "../../persistence/user_repo_firebase.js";
import { ResultRepoFirebase } from "../../persistence/result_repo_firebase.js";
import { CriarResultadoUseCase } from "../../aplication/useCasesResultadoBusca/criar_resultado.usecase.js";
import { CriarResultadoMapaUseCase } from "../../aplication/useCasesResultadoBusca/criar_mapa_resultado.usecase.js";
export class ResultadoRoutes {
    app;
    rotaResultQuiz = `/user/:idUser/resultado-quiz`;
    rotaResultMapa = `/user/resultado-mapa/:pais`;
    rotaUserResult = `/user/:idUser/resultado/:idResultado`;
    userRepoFirebase = new UserRepoFirebase();
    resultRepoFirebase = new ResultRepoFirebase();
    constructor(app) {
        this.app = app;
        this.iniciarRotas();
    }
    iniciarRotas() {
        const controller = new ResultadoBuscaController(new CriarResultadoUseCase(this.userRepoFirebase, this.resultRepoFirebase), new CriarResultadoMapaUseCase(this.resultRepoFirebase), new ObterResultadoUseCase(this.resultRepoFirebase), new DeletarResultadoUseCase(this.resultRepoFirebase));
        this.app.route(this.rotaResultQuiz).post(controller.criarResultQuiz);
        this.app.route(this.rotaResultMapa).post(controller.criarResultMapa);
        this.app.route(this.rotaUserResult).get(controller.obterResult).delete(controller.deletarResult);
        return this.app;
    }
}
