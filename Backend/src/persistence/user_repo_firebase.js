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
exports.UserRepoFirebase = void 0;
var firebase_1 = require("./firebase_config/firebase");
var UserRepoFirebase = /** @class */ (function () {
    function UserRepoFirebase() {
    }
    UserRepoFirebase.prototype.criarUser = function (dados) {
        return __awaiter(this, void 0, void 0, function () {
            var userRecord, usuarioRef, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, firebase_1.auth.createUser({
                                email: dados.email,
                                password: dados.senha,
                            })];
                    case 1:
                        userRecord = _a.sent();
                        usuarioRef = firebase_1.db.collection("users").doc(userRecord.uid);
                        return [4 /*yield*/, usuarioRef.set({
                                id: userRecord.uid,
                                nome: dados.nome,
                                email: dados.email,
                            })];
                    case 2:
                        _a.sent();
                        usuarioRef.collection("historico").doc();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        if (error_1.code === "auth/email-already-exists") {
                            console.error("Erro: O e-mail já está cadastrado.");
                        }
                        else {
                            console.error("Erro ao criar usuário:", error_1.message);
                        }
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserRepoFirebase.prototype.obterUser = function (dados) {
        return __awaiter(this, void 0, void 0, function () {
            var idToken, decodedToken, user, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        idToken = dados.idToken;
                        return [4 /*yield*/, firebase_1.auth.verifyIdToken(idToken)];
                    case 1:
                        decodedToken = _a.sent();
                        return [4 /*yield*/, firebase_1.db.collection("users").doc(decodedToken.uid).get()];
                    case 2:
                        user = _a.sent();
                        if (!user.exists) {
                            throw new Error("Usuario não encontrado");
                        }
                        return [2 /*return*/, user.data()];
                    case 3:
                        error_2 = _a.sent();
                        console.error("Erro ao obter usuário:", error_2.message);
                        throw error_2;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserRepoFirebase.prototype.deleteUser = function (dados) {
        return __awaiter(this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = dados.id;
                        return [4 /*yield*/, firebase_1.auth.deleteUser(id)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, firebase_1.db.collection("users").doc(id).delete()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserRepoFirebase.prototype.updateUserName = function (dados) {
        return __awaiter(this, void 0, void 0, function () {
            var userUpdated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, firebase_1.db.collection("users").doc(dados.id).update({
                            nome: dados.novoNome,
                        })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, firebase_1.db.collection("users").doc(dados.id).get()];
                    case 2:
                        userUpdated = (_a.sent()).data();
                        return [2 /*return*/, userUpdated];
                }
            });
        });
    };
    UserRepoFirebase.prototype.updateUserPassword = function (dados) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, firebase_1.auth.updateUser(dados.id, { password: dados.novoSenha })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, firebase_1.db.collection('users').doc(dados.id).get()];
                    case 2:
                        user = (_a.sent()).data();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserRepoFirebase.prototype.adicionarResultado = function (dados) {
        return __awaiter(this, void 0, void 0, function () {
            var idUser, resultado;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idUser = dados.idUser, resultado = dados.resultado;
                        return [4 /*yield*/, firebase_1.db.collection('users').doc(idUser).collection('historico').doc(resultado.id).set({
                                id: resultado.id,
                                dataBusca: resultado.dataBusca,
                                tipoBusca: resultado.tipoBusca
                            })];
                    case 1:
                        _a.sent();
                        resultado.plantas.forEach(function (planta) {
                            var plantaRef = firebase_1.db.collection('users').doc(idUser).collection('historico').doc(resultado.id).collection('plantas').doc(planta.id);
                            firebase_1.db.batch().set(plantaRef, planta);
                        });
                        return [4 /*yield*/, firebase_1.db.batch().commit()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserRepoFirebase.prototype.obterHistorico = function (dados) {
        return __awaiter(this, void 0, void 0, function () {
            var idUser, historico;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        idUser = dados.idUser;
                        return [4 /*yield*/, firebase_1.db.collection('users').doc(idUser).get()];
                    case 1:
                        historico = (_a = (_b.sent()).data()) === null || _a === void 0 ? void 0 : _a.historico;
                        return [2 /*return*/, historico];
                }
            });
        });
    };
    UserRepoFirebase.prototype.limparHistorico = function (dados) {
        return __awaiter(this, void 0, void 0, function () {
            var idUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idUser = dados.idUser;
                        return [4 /*yield*/, firebase_1.db.collection('users').doc(idUser).update({ historico: [] })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, { mensagem: "Histórico limpo com sucesso" }];
                }
            });
        });
    };
    return UserRepoFirebase;
}());
exports.UserRepoFirebase = UserRepoFirebase;
