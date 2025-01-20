"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultadoRoutes = void 0;
var resultado_busca_controller_1 = require("../controllers/resultado_busca.controller");
var preencher_resultado_usecase_1 = require("../../aplication/useCasesResultadoBusca/preencher_resultado.usecase");
var obter_resultado_usecase_1 = require("../../aplication/useCasesResultadoBusca/obter_resultado.usecase");
var deletar_resultado_usecase_1 = require("../../aplication/useCasesResultadoBusca/deletar_resultado.usecase");
var ResultadoRoutes = /** @class */ (function () {
    function ResultadoRoutes(app) {
        this.rotaResultado = '/resultado/:id';
        this.rotaUserResult = "/user/:id_user/".concat(this.rotaResultado);
        this.app = app;
        this.iniciarRotas();
    }
    ResultadoRoutes.prototype.iniciarRotas = function () {
        var controller = new resultado_busca_controller_1.ResultadoBuscaController(new preencher_resultado_usecase_1.PreencherResultadoUseCase(this.userGateway, this.resultGateway), new obter_resultado_usecase_1.ObterResultadoUseCase(this.resultGateway), new deletar_resultado_usecase_1.DeletarResultadoUseCase(this.resultGateway));
        this.app.route(this.rotaUserResult).patch(controller.preencherResult);
        this.app.route(this.rotaResultado).get(controller.obterResult).delete(controller.deletarResult);
        return this.app;
    };
    return ResultadoRoutes;
}());
exports.ResultadoRoutes = ResultadoRoutes;
