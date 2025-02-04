import { PerguntaController } from "../controllers/pergunta.controller";
import { ObterPerguntaUseCase } from "../../aplication/useCasesPergunta/obter_pergunta.usecase";
export class Pergunta {
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
