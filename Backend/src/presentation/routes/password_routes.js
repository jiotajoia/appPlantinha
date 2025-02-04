import { PasswordController } from "../controllers/password.controllers";
import { EditarSenhaUseCase } from "../../aplication/useCasesPassword/editar_senha.usecase";
import { VerifyCodeUseCase } from "../../aplication/useCasesPassword/verify_code.usecase";
import { SendCodeUseCase } from "../../aplication/useCasesPassword/send_code.usecase";
export class Password_routes {
    app;
    rotaReset = '/reset-password';
    rotaVerify = '/verify-code';
    rotaSend = '/send-code';
    controler = new PasswordController(new EditarSenhaUseCase(), new VerifyCodeUseCase(), new SendCodeUseCase());
    constructor(app) {
        this.app = app;
        this.iniciarRotas();
    }
    iniciarRotas() {
        this.app.route(this.rotaReset).post(this.controler.resetPassword);
        this.app.route(this.rotaVerify).post(this.controler.verifyCode);
        this.app.route(this.rotaSend).post(this.controler.sendCode);
        return this.app;
    }
}
