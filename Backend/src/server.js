"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var port = 3000;
app.get('/', function (req, res) {
    res.send('Hello, TypeScript with Express!');
});
app.listen(port, function () {
    console.log("Server running at http://localhost:".concat(port));
});
