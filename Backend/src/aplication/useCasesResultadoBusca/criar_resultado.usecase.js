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
exports.CriarResultadoUseCase = void 0;
var axios_1 = require("axios");
var planta_entity_1 = require("../../domain/entities/planta.entity");
var CriarResultadoUseCase = /** @class */ (function () {
    function CriarResultadoUseCase(userRepoFirebase, resultRepoFirebase) {
        this.userRepoFirebase = userRepoFirebase;
        this.resultRepoFirebase = resultRepoFirebase;
    }
    CriarResultadoUseCase.prototype.create = function (userRepoFirebase, resultRepoFirebase) {
        return new CriarResultadoUseCase(userRepoFirebase, resultRepoFirebase);
    };
    CriarResultadoUseCase.prototype.execute = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var plantas_trefle, url, nomePlantasSelecionadas, contador, plantasProntas, _i, nomePlantasSelecionadas_1, nome, url_perenual1, response, id_planta, url_perenual2, resultado;
            var idUser = _b.idUser, respostas = _b.respostas;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        plantas_trefle = [];
                        url = 'https://trefle.io/api/v1/species?token=YJ3VsoaJ5n-NkSRbrHCLzcCn1XLQkYN52iRbc3EFScU';
                        //fazer filtragem , imagino que poderia ser feito com as respostas sendo um json e e cada campo com valor de filtro
                        /*
                        let respostas1 = {
                            avarage_heigh : '3m',
                            ediale: 'false',
                            flower: 'true',
                        }
                        */
                        Object.entries(respostas).forEach(function (_a) {
                            var chave = _a[0], valor = _a[1];
                            if (valor != null) {
                                url += "&filter[".concat(chave, "]=").concat(valor);
                            }
                        });
                        //Pergunta: A planta é uma arvore?
                        //Pergunta: A planta é encontrada no Brazil?
                        //Pergunta: A planta é toxica?
                        //Pergunta: A planta é medicinal?
                        //Pergunta: As folhas da planta caem no outono?
                        //Pergunta: A flores são vermelhas/azuis/brancas/roxas/rosas/amarelas?
                        //Pergunta: A planta é comumente encontrada em florestas/areas umidas/campo aberto/ deserto?
                        //Pergunta: A planta é de sol/sombra/ equilibrado?
                        //Pergunta: A planta é muito/pouco/medio tolerante seca?
                        //Pergunta: A planta é comestivel?
                        //sim =  true // direcionar para pergunta de qual parte é comestivel
                        //não =  false
                        //talvez = null() //direcionar para outra pergunta
                        axios_1.default.get(url).then(function (response) {
                            plantas_trefle = (response.data.data);
                        }).catch(function (error) {
                            throw new Error(error);
                        });
                        nomePlantasSelecionadas = [];
                        contador = 0;
                        plantasProntas = [];
                        while (contador < 5) {
                            nomePlantasSelecionadas.push(plantas_trefle[contador].common_name);
                        }
                        _i = 0, nomePlantasSelecionadas_1 = nomePlantasSelecionadas;
                        _c.label = 1;
                    case 1:
                        if (!(_i < nomePlantasSelecionadas_1.length)) return [3 /*break*/, 4];
                        nome = nomePlantasSelecionadas_1[_i];
                        url_perenual1 = "https://perenual.com/api/species-list?key=sk-g3X1678e55cae03338309&q=".concat(nome);
                        return [4 /*yield*/, axios_1.default.get(url_perenual1)];
                    case 2:
                        response = _c.sent();
                        id_planta = response.data.data[0].id;
                        url_perenual2 = "https://perenual.com/api/species/details/".concat(id_planta, "?key=sk-g3X1678e55cae03338309");
                        axios_1.default.get(url_perenual2).then(function (response) {
                            var planta = planta_entity_1.Planta.create((response.data).common_name, (response.data).scientific_name[0], (response.data).default_image.original_url, (response.data).description, (response.data).care_level, (response.data).medicinal, (response.data).sunlight[0]);
                            plantasProntas.push(planta);
                        }).catch(function (error) {
                            throw new Error(error);
                        });
                        _c.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        resultado = this.resultRepoFirebase.criarResultado({ plantas: plantasProntas });
                        return [4 /*yield*/, this.userRepoFirebase.adicionarResultado({ idUser: idUser, resultado: resultado.resultado })];
                    case 5:
                        _c.sent();
                        return [2 /*return*/, resultado];
                }
            });
        });
    };
    return CriarResultadoUseCase;
}());
exports.CriarResultadoUseCase = CriarResultadoUseCase;
