"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObterQuizUseCase = void 0;
var quiz_entity_1 = require("../../domain/entities/quiz.entity");
var resultado_busca_entity_1 = require("../../domain/entities/resultado_busca.entity");
var ObterQuizUseCase = /** @class */ (function () {
    function ObterQuizUseCase() {
    }
    ObterQuizUseCase.prototype.create = function () {
        return new ObterQuizUseCase();
    };
    ObterQuizUseCase.prototype.execute = function () {
        return __awaiter(this, void 0, void 0, function () {
            var resultado, quiz, output;
            return __generator(this, function (_a) {
                resultado = resultado_busca_entity_1.ResultadoBusca.create("03-09-2004", "quiz", []);
                quiz = quiz_entity_1.Quiz.create(resultado);
                output = this.presentOutput(quiz);
                return [2 /*return*/, output];
            });
        });
    };
    ObterQuizUseCase.prototype.presentOutput = function (quiz) {
        return {
            id: quiz.id,
            perguntas: quiz.perguntas.map(function (pergunta) { return ({
                id: pergunta.id,
                indagacao: pergunta.indagacao,
                opcoes: pergunta.opcoes.map(function (opcao) { return opcao; })
            }); }),
            resultado: {
                id: quiz.resultado.id,
                dataBusca: quiz.resultado.dataBusca,
                tipoBusca: quiz.resultado.tipoBusca,
                plantas: quiz.resultado.plantas.map(function (planta) { return ({
                    id: planta.id,
                    nome: planta.nome,
                    nomeCientifico: planta.nomeCientifico,
                    imagem: planta.imagem,
                    cuidados: planta.cuidados,
                    curiosidades: planta.curiosidades,
                    ambiente: planta.ambiente,
                    shadowOrLightType: planta.shadowOrLightType
                }); })
            }
        };
    };
    return ObterQuizUseCase;
}());
exports.ObterQuizUseCase = ObterQuizUseCase;
