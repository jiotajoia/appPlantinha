//import { ResultadoRoutes } from "./presentation/routes/resultado_routes.js";
//import { ImagemRoutes } from "./presentation/routes/imagem_routes.js";
//import { HistoricoRoutes } from "./presentation/routes/historico_routes.js";
import dotenv from 'dotenv';
dotenv.config();
import { Password_routes } from './presentation/routes/password_routes.js';
//import { PerguntaRoutes } from './presentation/routes/pergunta_routes.js';
import express from 'express';
import { UserRoutes } from './presentation/routes/user_routes.js';
const port = process.env.PORT;
if (!port) {
    console.log('Variável não carregada!');
}
console.log('port: ', port);
const perenual = process.env.API_KEY_PERENUAL;
if (!perenual) {
    console.log('Variável não carregada!');
}
console.log('perenual: ', perenual);
const app = express();
const porta = 3000;
app.use(express.json());
//melhorar padronização de nomes em geral
new Password_routes(app); //verificado, funcionamento esperado.
new UserRoutes(app); //verificado, funcionamento esperado.
//new PerguntaRoutes(app);
//new ResultadoRoutes(app);
//new HistoricoRoutes(app);
//new ImagemRoutes(app);
app.listen(porta, '0.0.0.0', () => {
    console.log('Servidor rodando na porta 3000');
});
