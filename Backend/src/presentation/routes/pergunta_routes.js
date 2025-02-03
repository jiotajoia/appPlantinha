"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizRoutes = void 0;
var quiz_controller_1 = require("../controllers/quiz.controller");
var obter_quiz_usecase_1 = require("../../aplication/useCasesQuiz/obter_quiz.usecase");
var obter_pergunta_usecase_1 = require("../../aplication/useCasesQuiz/obter_pergunta.usecase");
var QuizRoutes = /** @class */ (function () {
    function QuizRoutes(app) {
        this.rotaQuiz = '/quiz';
        this.rotaPergunta = '/pergunta/:id';
        this.app = app;
        this.iniciarRotas();
    }
    QuizRoutes.prototype.iniciarRotas = function () {
        var controller = new quiz_controller_1.QuizController(new obter_quiz_usecase_1.ObterQuizUseCase(), new obter_pergunta_usecase_1.ObterPerguntaUseCase(this.perguntaGateway));
        this.app.route(this.rotaQuiz).get(controller.obterQuiz);
        this.app.route(this.rotaPergunta).get(controller.obterPergunta);
        return this.app;
    };
    return QuizRoutes;
}());
exports.QuizRoutes = QuizRoutes;
