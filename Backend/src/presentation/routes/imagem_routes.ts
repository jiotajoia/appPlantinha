import { Application , Request, Response} from "express";
import { ImagemLogic } from "../../aplication/Imagem_logic";
import { ImagemController } from "../controllers/imagem.controller";
import { ReconhecimentoCommand } from "../../aplication/useCasesImagem/reconhecimento.command";
import { UserRepo } from "../../domain/repositories/user_repo";
import { ResultadoRepo } from "../../domain/repositories/resultado_repo";

export class ImagemRoutes{
    app: Application;
    rotaImagem: string = '/user/:id/imagem';

    userRepo!: UserRepo;
    resultRepo!: ResultadoRepo;

    constructor(app: Application){
        this.app = app;
        this.iniciarRotas();
    }

    iniciarRotas(): Application{
        const controller: ImagemController = new ImagemController(new ReconhecimentoCommand(this.resultRepo, this.userRepo));
        this.app.route(this.rotaImagem).post(controller.reconhecimento);
        
        return this.app
    }
}