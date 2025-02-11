import { Application} from "express";
import { ResultadoBuscaController } from "../controllers/resultado_busca.controller";
import { ObterResultadoUseCase } from "../../aplication/useCasesResultadoBusca/obter_resultado.usecase";
import { DeletarResultadoUseCase } from "../../aplication/useCasesResultadoBusca/deletar_resultado.usecase";
import { UserRepoFirebase } from "../../persistence/user_repo_firebase";
import { ResultRepoFirebase } from "../../persistence/result_repo_firebase";
import { CriarResultadoUseCase } from "../../aplication/useCasesResultadoBusca/criar_resultado.usecase";
import { CriarResultadoMapaUseCase } from "../../aplication/useCasesResultadoBusca/criar_mapa_resultado.usecase";

export class ResultadoRoutes{
    app: Application;
    rotaResultQuiz: string = `/user/:idUser/resultado-quiz`;
    rotaResultMapa: string = `/user/resultado-mapa/:pais`;
    rotaUserResult: string = `/user/:idUser/resultado/:idResultado`;
    userRepoFirebase: UserRepoFirebase = new UserRepoFirebase();
    resultRepoFirebase: ResultRepoFirebase = new ResultRepoFirebase();

    constructor(app: Application){
        this.app = app;
        this.iniciarRotas();
    }

    iniciarRotas(): Application{
        const controller = new ResultadoBuscaController(new CriarResultadoUseCase(this.userRepoFirebase, this.resultRepoFirebase), new CriarResultadoMapaUseCase(this.resultRepoFirebase), new ObterResultadoUseCase(this.resultRepoFirebase), new DeletarResultadoUseCase(this.resultRepoFirebase));
        
        this.app.route(this.rotaResultQuiz).post(controller.criarResultQuiz);
        this.app.route(this.rotaResultMapa).post(controller.criarResultMapa);

        this.app.route(this.rotaUserResult).get(controller.obterResult).delete(controller.deletarResult);

        return this.app;
    }
}