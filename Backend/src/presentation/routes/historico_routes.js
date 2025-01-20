"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoricoRoutes = void 0;
var historico_controller_1 = require("../controllers/historico.controller");
var limpar_historico_usecase_1 = require("../../aplication/useCasesHistorico/limpar_historico.usecase");
var obter_historico_usecase_1 = require("../../aplication/useCasesHistorico/obter_historico.usecase");
var HistoricoRoutes = /** @class */ (function () {
    function HistoricoRoutes(app) {
        this.rotaHistorico = '/user/:id/historico';
        this.app = app;
        this.iniciarRotas();
    }
    HistoricoRoutes.prototype.iniciarRotas = function () {
        var controller = new historico_controller_1.HistoricoController(new limpar_historico_usecase_1.LimparHistoricoUseCase(this.userGateway), new obter_historico_usecase_1.ObterHistoricoUseCase(this.userGateway));
        this.app.route(this.rotaHistorico).get(controller.obterHistorico).delete(controller.limparHistorico);
        return this.app;
    };
    return HistoricoRoutes;
}());
exports.HistoricoRoutes = HistoricoRoutes;
