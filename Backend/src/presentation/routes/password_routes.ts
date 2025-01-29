import { Application } from "express";
import { PasswordController } from "../controllers/password.controllers";

export class Password_routes{
    app: Application;
    rotaReset: string = '/reset-password';
    rotaVerify: string = '/verify-code';
    rotaSend: string = '/send-code';

    controler: PasswordController = new PasswordController();
    
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