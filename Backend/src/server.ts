import { UserRoutes } from "./presentation/routes/user_routes";
import { ResultadoRoutes } from "./presentation/routes/resultado_routes";
import { ImagemRoutes } from "./presentation/routes/imagem_routes";
import { HistoricoRoutes } from "./presentation/routes/historico_routes";
import { Password_routes } from './presentation/routes/password_routes';
//import { PerguntaRoutes } from './presentation/routes/pergunta_routes';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });  

console.log(process.env) 
const perenual = process.env.API_KEY_PERENUAL;

if (!perenual) {
    console.log('Variável não carregada!');
  }
console.log('perenual: ', perenual)

const app = express();
const port = 3000;

app.use(express.json());

//melhorar padronização de nomes em geral

new UserRoutes(app); //verificado, funcionamento esperado.
new Password_routes(app);//verificado, funcionamento esperado.
//new PerguntaRoutes(app);
new ResultadoRoutes(app);
new HistoricoRoutes(app);
new ImagemRoutes(app);


app.listen(port, '0.0.0.0', () => {
    console.log('Servidor rodando na porta 3000');
  });
  