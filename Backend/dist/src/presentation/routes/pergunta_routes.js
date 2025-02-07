import { PerguntaController } from "../controllers/pergunta.controller.js";
import { ObterPerguntaUseCase } from "../../aplication/useCasesPergunta/obter_pergunta.usecase.js";
export class PerguntaRoutes {
    app;
    rotaPergunta = '/pergunta/:id';
    perguntaGateway;
    constructor(app) {
        this.app = app;
        this.iniciarRotas();
    }
    iniciarRotas() {
        const controller = new PerguntaController(new ObterPerguntaUseCase(this.perguntaGateway));
        this.app.route(this.rotaPergunta).get(controller.obterPergunta);
        return this.app;
    }
}
