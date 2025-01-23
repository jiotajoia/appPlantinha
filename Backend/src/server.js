"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var user_routes_1 = require("./presentation/routes/user_routes");
var quiz_routes_1 = require("./presentation/routes/quiz_routes");
var resultado_routes_1 = require("./presentation/routes/resultado_routes");
var imagem_routes_1 = require("./presentation/routes/imagem_routes");
var historico_routes_1 = require("./presentation/routes/historico_routes");
var axios_1 = require("axios");
var app = express();
var port = 3000;
app.use(express.json());
app.get('/', function (req, res) {
    res.send('Hello, TypeScript with Express!');
});
//teste perenual
app.get('/perenual', function (req, res) {
    var url = "https://perenual.com/api/species-list?key=sk-g3X1678e55cae03338309&q=coconut";
    axios_1.default.get(url).then(function (response) {
        res.json((response.data.data));
    }).catch(function (error) {
        console.log(error);
    });
});
app.get('/perenual/detalhes', function (req, res) {
    var url = "https://perenual.com/api/species/details/2?key=sk-g3X1678e55cae03338309";
    axios_1.default.get(url).then(function (response) {
        res.json((response.data));
    }).catch(function (error) {
        console.log(error);
    });
});
//teste trefle
/*app.get('/treefle', (req, res) => {

  const url = `https://trefle.io/api/v1/plants?token=YJ3VsoaJ5n-NkSRbrHCLzcCn1XLQkYN52iRbc3EFScU`;
  
  axios.get(url).then((response) => {
    res.json((response.data.data));
  }).catch((error) => {
    console.log(error);
  });
});*/
app.get('/treefle', function (req, res) {
    var url = "https://trefle.io/api/v1/species?token=YJ3VsoaJ5n-NkSRbrHCLzcCn1XLQkYN52iRbc3EFScU";
    axios_1.default.get(url).then(function (response) {
        res.json((response.data.data));
    }).catch(function (error) {
        console.log(error);
    });
});
/*app.get('/treefle/detalhes', (req, res) => {

  const url = `https://trefle.io/api/v1/plants/24?token=YJ3VsoaJ5n-NkSRbrHCLzcCn1XLQkYN52iRbc3EFScU`;
  
  axios.get(url).then((response) => {
    res.json((response.data));
  }).catch((error) => {
    console.log(error);
  });
});*/
app.get('/treefle/detalhes', function (req, res) {
    var url = "https://trefle.io/api/v1/species/24?token=YJ3VsoaJ5n-NkSRbrHCLzcCn1XLQkYN52iRbc3EFScU";
    axios_1.default.get(url).then(function (response) {
        res.json((response.data.data));
    }).catch(function (error) {
        console.log(error);
    });
});
new user_routes_1.UserRoutes(app);
new quiz_routes_1.QuizRoutes(app);
new resultado_routes_1.ResultadoRoutes(app);
new historico_routes_1.HistoricoRoutes(app);
new imagem_routes_1.ImagemRoutes(app);
app.listen(port, function () {
    console.log("Server running at http://localhost:".concat(port));
});
