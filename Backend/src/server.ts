const express = require("express");
// import { UserRoutes } from "./presentation/routes/user_routes";
// import { QuizRoutes } from "./presentation/routes/quiz_routes";
// import { ResultadoRoutes } from "./presentation/routes/resultado_routes";
// import { ImagemRoutes } from "./presentation/routes/imagem_routes";
// import { HistoricoRoutes } from "./presentation/routes/historico_routes";
import axios from 'axios';
const dotenv = require('dotenv');

async function getApiKeys(): Promise<{ apiKeyPerenual: string | undefined, apiKeyTrefle: string | undefined }> {
  dotenv.config();

  const apiKeyPerenual = process.env.API_KEY_PERENUAL;
  const apiKeyTrefle = process.env.API_KEY_TREFLE;

  return { apiKeyPerenual, apiKeyTrefle };
}

const app = express();
const port = 3000;

app.use(express.json());

async function server() {
  const { apiKeyPerenual, apiKeyTrefle } = await getApiKeys();

  app.get('/', (req: any, res: { send: (arg0: string) => void; }) => {
    res.send('Hello, TypeScript with Express!');
  });

  //teste perenual

  app.get('/perenual', (req: any, res: { json: (arg0: any) => void; }) => {

    const url = `https://perenual.com/api/species-listkey=${apiKeyPerenual}`;

    axios.get(url).then((response: { data: { data: any; }; }) => {
      res.json((response.data.data));
    }).catch((error: any) => {
      console.log(error);
    });
  });

  app.get('/perenual/detalhes', (req: any, res: { json: (arg0: any) => void; }) => {

    const url = `https://perenual.com/api/species/details/2?key=${apiKeyPerenual}`;

    axios.get(url).then((response: { data: any; }) => {
      res.json((response.data));
    }).catch((error: any) => {
      console.log(error);
    });
  });

  //teste trefle
  /*app.get('/treefle', (req, res) => {
  
    const url = `https://trefle.io/api/v1/plants?`;
    
    axios.get(url).then((response) => {
      res.json((response.data.data));
    }).catch((error) => {
      console.log(error);
    });
  });*/

  app.get('/treefle', (req: any, res: { json: (arg0: any) => void; }) => {

    const url = `https://trefle.io/api/v1/species?token=${apiKeyTrefle}`;

    axios.get(url).then((response: { data: { data: any; }; }) => {
      res.json((response.data.data));
    }).catch((error: any) => {
      console.log(error);
    });
  });

  /*app.get('/treefle/detalhes', (req, res) => {
  
    const url = `https://trefle.io/api/v1/plants/24?`;
    
    axios.get(url).then((response) => {
      res.json((response.data));
    }).catch((error) => {
      console.log(error);
    });
  });*/

  app.get('/treefle/detalhes', (req: any, res: { json: (arg0: any) => void; }) => {

    const url = `https://trefle.io/api/v1/species/24?token=${apiKeyTrefle}`;

    axios.get(url).then((response: { data: { data: any; }; }) => {
      res.json((response.data.data));
    }).catch((error: any) => {
      console.log(error);
    });
  });

  // new UserRoutes(app);
  // new QuizRoutes(app);
  // new ResultadoRoutes(app);
  // new HistoricoRoutes(app);
  // new ImagemRoutes(app);

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });

}

server().catch(err => {
  console.error("Failed to start server:", err);
});