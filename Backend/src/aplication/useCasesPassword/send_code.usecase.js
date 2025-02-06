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
exports.SendCodeUseCase = void 0;
var admin = require("firebase-admin");
var googleapis_1 = require("googleapis");
var nodemailer = require("nodemailer");
var SendCodeUseCase = /** @class */ (function () {
    function SendCodeUseCase() {
    }
    SendCodeUseCase.prototype.create = function () {
        return new SendCodeUseCase();
    };
    SendCodeUseCase.prototype.execute = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var code, db, oauth2Client, accessToken, transporter, mailOptions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        code = Math.floor(100000 + Math.random() * 900000).toString();
                        db = admin.firestore();
                        return [4 /*yield*/, db.collection("verificationCodes").doc(email).set({
                                code: code,
                                createdAt: admin.firestore.FieldValue.serverTimestamp(),
                            })];
                    case 1:
                        _a.sent();
                        oauth2Client = new googleapis_1.google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, // Client ID do OAuth
                        process.env.GOOGLE_CLIENT_SECRET, // Client Secret do OAuth
                        process.env.GOOGLE_REDIRECT_URI // URI de redirecionamento
                        );
                        http: //localhost:3000/oauth2callback
                         oauth2Client.setCredentials({
                            refresh_token: process.env.GOOGLE_REFRESH_TOKEN, // O Refresh Token gerado
                        });
                        return [4 /*yield*/, oauth2Client.getAccessToken()];
                    case 2:
                        accessToken = _a.sent();
                        transporter = nodemailer.createTransport({
                            host: "smtp.gmail.com",
                            port: 587,
                            secure: false, // Use `true` para produção com STARTTLS ou 465 com SSL
                            requireTLS: true, // Adicione esta linha para garantir o TLS
                            auth: {
                                type: "OAuth2",
                                user: process.env.EMAIL_USER,
                                clientId: process.env.GOOGLE_CLIENT_ID,
                                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                                refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
                                accessToken: accessToken.token,
                            },
                        });
                        mailOptions = {
                            from: process.env.EMAIL_USER,
                            to: email,
                            subject: "Seu código de verificação",
                            text: "Seu c\u00F3digo de verifica\u00E7\u00E3o \u00E9: ".concat(code),
                        };
                        return [4 /*yield*/, transporter.sendMail(mailOptions)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return SendCodeUseCase;
}());
exports.SendCodeUseCase = SendCodeUseCase;
