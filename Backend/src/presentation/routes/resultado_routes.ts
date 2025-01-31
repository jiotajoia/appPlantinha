import { Application} from "express";
import { ResultadoBuscaController } from "../controllers/resultado_busca.controller";
import { PreencherResultadoUseCase } from "../../aplication/useCasesResultadoBusca/preencher_resultado.usecase";
import { ObterResultadoUseCase } from "../../aplication/useCasesResultadoBusca/obter_resultado.usecase";
import { DeletarResultadoUseCase } from "../../aplication/useCasesResultadoBusca/deletar_resultado.usecase";
import { UserRepoFirebase } from "../../persistence/user_repo_firebase";
import { ResultRepoFirebase } from "../../persistence/result_repo_firebase";

export class ResultadoRoutes{
    app: Application;
    rotaUserResult: string = `/user/:idUser/resultado/:idResultado`;
    userRepoFirebase!: UserRepoFirebase;
    resultRepoFirebase!: ResultRepoFirebase;

    constructor(app: Application){
        this.app = app;
        this.iniciarRotas();
    }

    iniciarRotas(): Application{
        const controller = new ResultadoBuscaController(new PreencherResultadoUseCase(this.userRepoFirebase, this.resultRepoFirebase), new ObterResultadoUseCase(this.resultRepoFirebase), new DeletarResultadoUseCase(this.resultRepoFirebase));
        
        this.app.route(this.rotaUserResult).patch(controller.preencherResult);

        this.app.route(this.rotaUserResult).get(controller.obterResult).delete(controller.deletarResult);

        return this.app;
    }
}