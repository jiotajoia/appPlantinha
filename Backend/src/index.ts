import express = require("express");
import { User_routes } from "./presentation/user_routes";
import { Quiz_routes } from "./presentation/quiz_routes";
import { Resultado_routes } from "./presentation/resultado_routes";
import { Historico_routes } from "./presentation/historico_routes";
import { Imagem_routes } from "./presentation/imagem_routes";

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello, TypeScript with Express!');
});

new User_routes(app);
new Quiz_routes(app);
new Resultado_routes(app);
new Historico_routes(app);
new Imagem_routes(app);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});