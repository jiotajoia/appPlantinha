import express = require("express");
import { UserRoutes } from "./presentation/routes/user_routes";
import { QuizRoutes } from "./presentation/routes/quiz_routes";
import { ResultadoRoutes } from "./presentation/routes/resultado_routes";
import { ImagemRoutes } from "./presentation/routes/imagem_routes";
import { HistoricoRoutes } from "./presentation/routes/historico_routes";
import axios from 'axios';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, TypeScript with Express!');
});

//teste perenual

app.get('/perenual', (req, res) => {

    const url = `https://perenual.com/api/species-list?key=sk-g3X1678e55cae03338309&q=coconut`;
    
    axios.get(url)
        .then((response) => {
      res.json((response.data.data));
    })
        .catch((error) => {
      console.log(error);
    });
});

app.get('/perenual/detalhes', (req, res) => {

    const url = `https://perenual.com/api/species/details/1?key=sk-g3X1678e55cae03338309`;
    
    axios.get(url)
        .then((response) => {
      res.json((response.data));
    })
        .catch((error) => {
      console.log(error);
    });
});

new UserRoutes(app);
new QuizRoutes(app);
new ResultadoRoutes(app);
new HistoricoRoutes(app);
new ImagemRoutes(app);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});