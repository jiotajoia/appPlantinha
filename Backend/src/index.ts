import express = require("express");
import { UserRoutes } from "./presentation/user_routes";
import { QuizRoutes } from "./presentation/quiz_routes";
import { ResultadoRoutes } from "./presentation/resultado_routes";
import { HistoricoRoutes } from "./presentation/historico_routes";
import { ImagemRoutes } from "./presentation/imagem_routes";

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello, TypeScript with Express!');
});

new UserRoutes(app);
new QuizRoutes(app);
new ResultadoRoutes(app);
new HistoricoRoutes(app);
new ImagemRoutes(app);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});