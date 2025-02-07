import { Application } from "express";
import { PasswordController } from "../controllers/password.controllers";
import { EditarSenhaUseCase } from "../../aplication/useCasesPassword/editar_senha.usecase";
import { VerifyCodeUseCase } from "../../aplication/useCasesPassword/verify_code.usecase";
import { SendCodeUseCase } from "../../aplication/useCasesPassword/send_code.usecase";

export class PasswordRoutes{
    app: Application;
    rotaReset: string = '/reset-password';
    rotaVerify: string = '/verify-code';
    rotaSend: string = '/send-code';

    constructor(app: Application){
        this.app = app;
        this.iniciarRotas();
    }
    
    iniciarRotas(): Application{
        const controler: PasswordController = new PasswordController(new EditarSenhaUseCase(), new VerifyCodeUseCase(), new SendCodeUseCase());
        
        this.app.route(this.rotaReset).post(controler.resetPassword);
        this.app.route(this.rotaVerify).post(controler.verifyCode);
        this.app.route(this.rotaSend).post(controler.sendCode);

        return this.app;
    }

}