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
exports.PasswordController = void 0;
var PasswordController = /** @class */ (function () {
    function PasswordController(editarSenhaUseCases, verifyCodeUseCases, sendCodeUseCases) {
        var _this = this;
        this.editarSenhaUseCases = editarSenhaUseCases;
        this.verifyCodeUseCases = verifyCodeUseCases;
        this.sendCodeUseCases = sendCodeUseCases;
        this.resetPassword = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, email, newPassword, confirmPassword, regex, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, email = _a.email, newPassword = _a.newPassword, confirmPassword = _a.confirmPassword;
                        if (!email || !newPassword || !confirmPassword) {
                            res.status(400).json({ error: "As senhas e email não podem estar vazias" });
                        }
                        regex = new RegExp("^(?=.*[A-Z])(?=.*\\d)(?=.*[!@#\\$&*~]).{8,}$");
                        if (!regex.test(newPassword)) {
                            res.status(400).json({ error: "A senha deve conter no mínimo 8 caracteres, uma letra maiúscula, um número e um caractere especial.", });
                        }
                        if (newPassword !== confirmPassword) {
                            res.status(400).json({ error: "As senhas não conferem." });
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.editarSenhaUseCases.execute(email, newPassword)];
                    case 2:
                        _b.sent();
                        res.status(200).json({ message: "Senha alterada com sucesso!" });
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        console.error("Erro ao alterar senha:", error_1);
                        res.status(500).json({ error: "Erro ao alterar senha." });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.verifyCode = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, email, code, savedCode, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, email = _a.email, code = _a.code;
                        if (!email || !code) {
                            res.status(400).json({ error: "E-mail e código são obrigatórios." });
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.verifyCodeUseCases.execute(email)];
                    case 2:
                        savedCode = _b.sent();
                        if (!savedCode) {
                            res.status(404).json({ error: "Código não encontrado." });
                        }
                        if (savedCode !== code) {
                            res.status(403).json({ error: "Código inválido." });
                        }
                        res.status(200).json({ message: "Código verificado com sucesso!" });
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _b.sent();
                        console.error("Erro ao verificar código:", error_2);
                        res
                            .status(500)
                            .json({ error: "Erro ao verificar código de verificação." });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.sendCode = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var email, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = req.body.email;
                        if (!email) {
                            res.status(400).json({ error: "O e-mail é obrigatório." });
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.sendCodeUseCases.execute(email)];
                    case 2:
                        _a.sent();
                        res.status(200).json({ message: "Código enviado com sucesso!" });
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        console.error("Erro ao enviar código:", error_3);
                        res.status(500).json({ error: "Erro ao enviar código de verificação." });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
    }
    return PasswordController;
}());
exports.PasswordController = PasswordController;
