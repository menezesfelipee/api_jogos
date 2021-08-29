const express = require("express");
const mongoose = require("./database");
const JogoSchema = require("./models/Jogo");
const validaId = (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(422).send({ mensagem: "ID inválido!" });
        return;
    };
};
const validaJogo = (res, jogo) => {
    if (!jogo) {
        res.status(404).send({ mensagem: "Jogo não encontrado." });
        return;
    };
};
const validaJSON = (res, jogo) => {
    if (!jogo || !jogo.nome || !jogo.ano || !jogo.imagem) {
        res.status(400).send({ mensagem: "Campo preenchidos incorretamente." });
        return;
    };
};

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
    const id = req.params.id
    validaId(id);

    const jogo = await JogoSchema.findById(id);
    validaJogo(jogo);

    res.status(200).json({ jogo });
});

// Rota para adicionar um jogo
app.post("/jogos", async (req, res) => {
    const jogo = req.body;
    validaJSON(jogo);

    const novoJogo = await new JogoSchema(jogo).save();

    res.status(201).json({ novoJogo });
});

// Rota para alterar um jogo pelo ID
app.put("/jogos/:id", async (req, res) => {
    const id = req.params.id;
    validaId(id);

    const jogo = await JogoSchema.findById(id);
    validaJogo(res, jogo);

    let jogoModificado = req.body;
    validaJogo(jogoModificado);
    await JogoSchema.findByIdAndUpdate({ _id: id }, jogoModificado);

    jogoModificado = await JogoSchema.findById(id);
    res.status(200).json({ jogoModificado });
});

// Rota para deletar um jogo pelo ID
app.delete("/jogos/:id", async (req, res) => {
    const id = req.params.id;
    validaId(id);

    const jogo = await JogoSchema.findById(id);
    validaJogo(jogo);

    await JogoSchema.findByIdAndDelete(id);
    res.status(200).send({ mensagem: "Jogo deletado com sucesso!" });
});

// API rodando na porta solicitada
app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));