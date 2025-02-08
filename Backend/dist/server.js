import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { PasswordRoutes } from './presentation/routes/password_routes.js';
import { UserRoutes } from './presentation/routes/user_routes.js';
import { PerguntaRoutes } from './presentation/routes/pergunta_routes.js';
import { ResultadoRoutes } from './presentation/routes/resultado_routes.js';
//import { ImagemRoutes } from "./presentation/routes/imagem_routes.js";
import { HistoricoRoutes } from "./presentation/routes/historico_routes.js";
const port = 3000;
const perenual = process.env.API_KEY_PERENUAL;
if (!perenual) {
    console.log('Variável não carregada!');
}
console.log('perenual: ', perenual);
const app = express();
app.use(express.json());
// Iniciando as rotas
new PasswordRoutes(app); //verificado, funcionamento esperado.
new UserRoutes(app); //verificado, funcionamento esperado.
new PerguntaRoutes(app); //verificado, funcionamento esperado. obs: falta Adicionar perguntas no bando de dados
new ResultadoRoutes(app); //verificado, funcionamento esperado. obs : lembrar de esconder as chave de api na implementaçao
new HistoricoRoutes(app); //verificado, funcionamento parcialmente esperado. obs: é necessario perceber como o firebase devolve os dados, pode ser que exista uma incongruencia.
//new ImagemRoutes(app);
app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${port}`);
});
