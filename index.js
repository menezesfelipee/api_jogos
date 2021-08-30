const express = require("express");
const mongoose = require("./database");
const JogoSchema = require("./models/Jogo");
const func = require("./funcoes");

// Configurações iniciais
const app = express();
const port = 3000;
app.use(express.json());

// Rota para a raiz da API
app.get("/", (req, res) => {
    res.status(200).send({ mensagem: "Bem-vindo à API de Jogos do Felipe!" });
});

// Rota para mostrar todos os jogos cadastrados
app.get("/jogos", async (req, res) => {
    const jogos = await JogoSchema.find();
    res.status(200).json(jogos);
});

// Rota para mostrar um jogo através do ID
app.get("/jogos/:id", async (req, res) => {
    const id = req.params.id;
    func.validaId(id, res);

    const jogo = await JogoSchema.findById(id);
    func.validaJogo(jogo, res);

    res.status(200).json(jogo);
});

// Rota para adicionar um jogo
app.post("/jogos", async (req, res) => {
    const jogo = req.body;
    func.validaJSON(jogo, res);

    const novoJogo = await new JogoSchema(jogo).save();

    res.status(201).json(novoJogo);
});

// Rota para alterar um jogo pelo ID
app.put("/jogos/:id", async (req, res) => {
    const id = req.params.id;
    func.validaId(id, res);

    const jogo = await JogoSchema.findById(id);
    func.validaJogo(jogo, res);

    let jogoModificado = req.body;
    func.validaJSON(jogoModificado, res);
    await JogoSchema.findByIdAndUpdate({ _id: id }, jogoModificado);

    jogoModificado = await JogoSchema.findById(id);
    res.status(200).json(jogoModificado);
});

// Rota para deletar um jogo pelo ID
app.delete("/jogos/:id", async (req, res) => {
    const id = req.params.id;
    func.validaId(id, res);

    const jogo = await JogoSchema.findById(id);
    func.validaJogo(id, res);

    await JogoSchema.findByIdAndDelete(id);
    res.status(200).send({ mensagem: "Jogo deletado com sucesso!" });
});

// API rodando na porta solicitada
app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));