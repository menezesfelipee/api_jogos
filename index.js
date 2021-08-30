const express = require("express");
const mongoose = require("./database");
const JogoSchema = require("./models/Jogo");

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
    res.status(200).json({ jogos });
});

// Rota para mostrar um jogo através do ID
app.get("/jogos/:id", async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(422).send({ mensagem: "ID inválido!" });
        return;
    };

    const jogo = await JogoSchema.findById(id);
    if (!jogo) {
        res.status(404).send({ mensagem: "Jogo não encontrado." });
        return;
    };

    res.status(200).json({ jogo });
});

// Rota para adicionar um jogo
app.post("/jogos", async (req, res) => {
    const jogo = req.body;
    if (!jogo || !jogo.nome || !jogo.ano || !jogo.imagem) {
        res.status(400).send({ mensagem: "Campos preenchidos incorretamente." });
        return;
    };

    const novoJogo = await new JogoSchema(jogo).save();

    res.status(201).json({ novoJogo });
});

// Rota para alterar um jogo pelo ID
app.put("/jogos/:id", async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(422).send({ mensagem: "ID inválido!" });
        return;
    };

    const jogo = await JogoSchema.findById(id);
    if (!jogo) {
        res.status(404).send({ mensagem: "Jogo não encontrado." });
        return;
    };

    let jogoModificado = req.body;
    if (!jogoModificado || !jogoModificado.nome || !jogoModificado.ano || !jogoModificado.imagem) {
        res.status(400).send({ mensagem: "Campos preenchidos incorretamente." });
        return;
    };
    await JogoSchema.findByIdAndUpdate({ _id: id }, jogoModificado);

    jogoModificado = await JogoSchema.findById(id);
    res.status(200).json({ jogoModificado });
});

// Rota para deletar um jogo pelo ID
app.delete("/jogos/:id", async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(422).send({ mensagem: "ID inválido!" });
        return;
    };

    const jogo = await JogoSchema.findById(id);
    if (!jogo) {
        res.status(404).send({ mensagem: "Jogo não encontrado." });
        return;
    };

    await JogoSchema.findByIdAndDelete(id);
    res.status(200).send({ mensagem: "Jogo deletado com sucesso!" });
});

// API rodando na porta solicitada
app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));