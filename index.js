const express = require("express");
const mongoose = require("./database");
const JogoSchema = require("./models/Jogo");

// Configurações iniciais
const app = express();
const port = 3000;
app.use(express.json());



// API rodando na porta solicitada
app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));