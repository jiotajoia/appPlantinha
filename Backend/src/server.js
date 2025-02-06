"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_routes_1 = require("./presentation/routes/user_routes");
//import { ResultadoRoutes } from "./presentation/routes/resultado_routes";
//import { ImagemRoutes } from "./presentation/routes/imagem_routes";
//import { HistoricoRoutes } from "./presentation/routes/historico_routes";
var password_routes_1 = require("./presentation/routes/password_routes");
//import { PerguntaRoutes } from './presentation/routes/pergunta_routes';
var express = require("express");
var dotenv_1 = require("dotenv");
dotenv_1.config({ path: '../.env' });
var perenual = process.env.API_KEY_PERENUAL;
if (!perenual) {
    console.log('Variável não carregada!');
}
console.log('perenual: ', perenual);
var app = express();
var port = 3000;
app.use(express.json());
//melhorar padronização de nomes em geral
new user_routes_1.UserRoutes(app); //verificado, funcionamento esperado.
new password_routes_1.Password_routes(app); //verificado, funcionamento esperado.
//new PerguntaRoutes(app);
//new ResultadoRoutes(app);
//new HistoricoRoutes(app);
//new ImagemRoutes(app);
app.listen(port, '0.0.0.0', function () {
    console.log('Servidor rodando na porta 3000');
});
