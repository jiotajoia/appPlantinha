import express = require("express");
import { UserRoutes } from "./presentation/routes/user_routes";
import { QuizRoutes } from "./presentation/routes/quiz_routes";
import { ResultadoRoutes } from "./presentation/routes/resultado_routes";
import { ImagemRoutes } from "./presentation/routes/imagem_routes";
import { HistoricoRoutes } from "./presentation/routes/historico_routes";

const app = express();
const port = 3000;

app.use(express.json());

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