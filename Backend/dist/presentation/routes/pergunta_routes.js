import { PerguntaController } from "../controllers/pergunta.controller";
import { ObterPerguntaUseCase } from "../../aplication/useCasesPergunta/obter_pergunta.usecase";
import { PerguntaRepoFirebase } from "../../persistence/pergunta_repo";
export class PerguntaRoutes {
    app;
    rotaPergunta = '/pergunta/:id';
    perguntaRepofirebase = new PerguntaRepoFirebase();
    constructor(app) {
        this.app = app;
        this.iniciarRotas();
    }
    iniciarRotas() {
        const controller = new PerguntaController(new ObterPerguntaUseCase(this.perguntaRepofirebase));
        this.app.route(this.rotaPergunta).get(controller.obterPergunta);
        return this.app;
    }
}
