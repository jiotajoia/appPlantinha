import express from 'express';
import { UserRoutes } from "./presentation/routes/user_routes";
import { QuizRoutes } from "./presentation/routes/pergunta_routes";
import { ResultadoRoutes } from "./presentation/routes/resultado_routes";
import { ImagemRoutes } from "./presentation/routes/imagem_routes";
import { HistoricoRoutes } from "./presentation/routes/historico_routes";
import dotenv from 'dotenv';
import { Password_routes } from './presentation/routes/password_routes';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

new UserRoutes(app);
new QuizRoutes(app);
new ResultadoRoutes(app);
new HistoricoRoutes(app);
new ImagemRoutes(app);
new Password_routes(app);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});