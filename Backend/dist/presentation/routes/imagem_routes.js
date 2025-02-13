import { ImagemController } from "../controllers/imagem.controller";
import { ReconhecimentoUseCase } from "../../aplication/useCasesImagem/reconhecimento.usecase";
import { UserRepoFirebase } from "../../persistence/user_repo_firebase";
import { ResultRepoFirebase } from "../../persistence/result_repo_firebase";
export class ImagemRoutes {
    app;
    rotaImagem = '/user/:id/imagem';
    userGateway = new UserRepoFirebase();
    resultGateway = new ResultRepoFirebase();
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
