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
exports.UsuarioController = void 0;
var UsuarioController = /** @class */ (function () {
    function UsuarioController(criarUsuarioUseCase, obterUsuarioUseCase, deletarUsuarioUseCase, alterarNomeUsuarioUseCase, alterarSenhaUsuarioUseCase) {
        var _this = this;
        this.criarUsuarioUseCase = criarUsuarioUseCase;
        this.obterUsuarioUseCase = obterUsuarioUseCase;
        this.deletarUsuarioUseCase = deletarUsuarioUseCase;
        this.alterarNomeUsuarioUseCase = alterarNomeUsuarioUseCase;
        this.alterarSenhaUsuarioUseCase = alterarSenhaUsuarioUseCase;
        this.criarUsuario = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, nome, email, senha, confirmacaoSenha, regex, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, nome = _a.nome, email = _a.email, senha = _a.senha, confirmacaoSenha = _a.confirmacaoSenha;
                        if (!email || !senha || !confirmacaoSenha) {
                            res.status(400).json({ error: "As senhas e email não podem estar vazias" });
                        }
                        regex = new RegExp("^(?=.*[A-Z])(?=.*\\d)(?=.*[!@#\\$&*~]).{8,}$");
                        if (!regex.test(senha)) {
                            res.status(400).json({ error: "A senha deve conter no mínimo 8 caracteres, uma letra maiúscula, um número e um caractere especial.", });
                        }
                        if (senha !== confirmacaoSenha) {
                            res.status(400).json({ error: "As senhas não conferem." });
                        }
                        return [4 /*yield*/, this.criarUsuarioUseCase.execute({ nome: nome, email: email, senha: senha })];
                    case 1:
                        _b.sent();
                        res.status(201).json({ message: "Usuário criado com sucesso" });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        res.status(500).json({
                            message: "Erro ao criar usuário.",
                            error: error_1.message,
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.obterUsuario = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var idToken, _a, _b, error_2;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        idToken = req.body.idToken;
                        _b = (_a = res.status(200)).json;
                        _c = { message: "Usuário obtido com sucesso" };
                        return [4 /*yield*/, this.obterUsuarioUseCase.execute({ idToken: idToken })];
                    case 1:
                        _b.apply(_a, [(_c.data = _d.sent(), _c)]);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _d.sent();
                        res.status(404).json({
                            message: "Erro ao obter usuário.",
                            error: error_2.message,
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.deletarUsuario = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        return [4 /*yield*/, this.deletarUsuarioUseCase.execute({ id: id })];
                    case 1:
                        _a.sent();
                        res.status(200).json({ message: "Usuário deletado com sucesso" });
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        res.status(500).json({
                            message: "Erro ao deletar usuário.",
                            error: error_3.message,
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.alterarNomeUsuario = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, novoNome, _a, _b, error_4;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        novoNome = req.body.novoNome;
                        _b = (_a = res.status(200)).json;
                        _c = { message: "Usuário atualizado com sucesso" };
                        return [4 /*yield*/, this.alterarNomeUsuarioUseCase.execute({ id: id, novoNome: novoNome })];
                    case 1:
                        _b.apply(_a, [(_c.data = _d.sent(), _c)]);
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _d.sent();
                        res.status(500).json({
                            message: "Erro ao alterar nome usuário.",
                            error: error_4.message,
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.alterarSenhaUsuario = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, _a, novoSenha, confirmaSenha, regex, _b, _c, error_5;
            var _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        _a = req.body, novoSenha = _a.novoSenha, confirmaSenha = _a.confirmaSenha;
                        if (!novoSenha || !confirmaSenha) {
                            res.status(400).json({ error: "As senhas não podem estar vazias" });
                        }
                        regex = new RegExp("^(?=.*[A-Z])(?=.*\\d)(?=.*[!@#\\$&*~]).{8,}$");
                        if (!regex.test(novoSenha)) {
                            res.status(400).json({ error: "A senha deve conter no mínimo 8 caracteres, uma letra maiúscula, um número e um caractere especial.", });
                        }
                        if (novoSenha !== confirmaSenha) {
                            res.status(400).json({ error: "As senhas não conferem." });
                        }
                        _c = (_b = res.status(200)).json;
                        _d = { message: "Usuário atualizado com sucesso" };
                        return [4 /*yield*/, this.alterarSenhaUsuarioUseCase.execute({ id: id, novoSenha: novoSenha, confirmaSenha: confirmaSenha })];
                    case 1:
                        _c.apply(_b, [(_d.data = _e.sent(), _d)]);
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _e.sent();
                        res.status(500).json({
                            message: "Erro ao alterar senha usuário.",
                            error: error_5.message,
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    }
    return UsuarioController;
}());
exports.UsuarioController = UsuarioController;
