import { ImagemController } from "../controllers/imagem.controller.js";
import { ReconhecimentoUseCase } from "../../aplication/useCasesImagem/reconhecimento.usecase.js";
export class ImagemRoutes {
    app;
    rotaImagem = '/user/:id/imagem';
    userGateway;
    resultGateway;
    constructor(app) {
        this.app = app;
        this.iniciarRotas();
    }
    iniciarRotas() {
        const controller = new ImagemController(new ReconhecimentoUseCase(this.resultGateway, this.userGateway));
        this.app.route(this.rotaImagem).post(controller.reconhecimento);
        return this.app;
    }
}
