"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImagemRoutes = void 0;
var imagem_controller_1 = require("../controllers/imagem.controller");
var reconhecimento_usecase_1 = require("../../aplication/useCasesImagem/reconhecimento.usecase");
var ImagemRoutes = /** @class */ (function () {
    function ImagemRoutes(app) {
        this.rotaImagem = '/user/:id/imagem';
        this.app = app;
        this.iniciarRotas();
    }
    ImagemRoutes.prototype.iniciarRotas = function () {
        var controller = new imagem_controller_1.ImagemController(new reconhecimento_usecase_1.ReconhecimentoUseCase(this.resultGateway, this.userGateway));
        this.app.route(this.rotaImagem).post(controller.reconhecimento);
        return this.app;
    };
    return ImagemRoutes;
}());
exports.ImagemRoutes = ImagemRoutes;
