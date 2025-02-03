import { Application } from "express";
import { PasswordController } from "../controllers/password.controllers";
import { EditarSenhaUseCase } from "../../aplication/useCasesPassword/editar_senha.usecase";
import { VerifyCodeUseCase } from "../../aplication/useCasesPassword/verify_code.usecase";
import { SendCodeUseCase } from "../../aplication/useCasesPassword/send_code.usecase";

export class Password_routes{
    app: Application;
    rotaReset: string = '/reset-password';
    rotaVerify: string = '/verify-code';
    rotaSend: string = '/send-code';

    controler: PasswordController = new PasswordController(new EditarSenhaUseCase(), new VerifyCodeUseCase(), new SendCodeUseCase());
    
    constructor(app: Application){
        this.app = app;
        this.iniciarRotas();
    }
    
    iniciarRotas(): Application{
        this.app.route(this.rotaReset).post(this.controler.resetPassword);
        this.app.route(this.rotaVerify).post(this.controler.verifyCode);
        this.app.route(this.rotaSend).post(this.controler.sendCode);

        return this.app;
    }

}