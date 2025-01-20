import { Application} from "express";
import { ResultadoBuscaController } from "../controllers/resultado_busca.controller";
import { UserGateway } from "../../domain/gateways/user.gateway";
import { ResultadoGateway } from "../../domain/gateways/resultado.gateway";
import { PreencherResultadoUseCase } from "../../aplication/useCasesResultadoBusca/preencher_resultado.usecase";
import { ObterResultadoUseCase } from "../../aplication/useCasesResultadoBusca/obter_resultado.usecase";
import { DeletarUsuarioUseCase } from "../../aplication/useCasesUsuario/deletar_usuario.usecase";
import { DeletarResultadoUseCase } from "../../aplication/useCasesResultadoBusca/deletar_resultado.usecase";

export class ResultadoRoutes{
    app: Application;
    rotaResultado: string = '/resultado/:id';
    rotaUserResult: string = `/user/:id_user/${this.rotaResultado}`;
    userGateway!: UserGateway;
    resultGateway!: ResultadoGateway;

    constructor(app: Application){
        this.app = app;
        this.iniciarRotas();
    }

    iniciarRotas(): Application{
        const controller = new ResultadoBuscaController(new PreencherResultadoUseCase(this.userGateway, this.resultGateway), new ObterResultadoUseCase(this.resultGateway), new DeletarResultadoUseCase(this.resultGateway));
        
        this.app.route(this.rotaUserResult).patch(controller.preencherResult);

        this.app.route(this.rotaResultado).get(controller.obterResult).delete(controller.deletarResult);

        return this.app;
    }
}