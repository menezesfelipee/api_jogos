const mongoose = require("mongoose");

function validaId(id, res) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(422).send({ mensagem: "ID inválido!" });
        return;
    };
};

function validaJogo(jogo, res) {
    if (!jogo) {
        res.status(404).send({ mensagem: "Jogo não encontrado." });
        return;
    };
};

function validaJSON(jogo, res) {
    if (!jogo || !jogo.nome || !jogo.ano || !jogo.imagem) {
        res.status(400).send({ mensagem: "Campos preenchidos incorretamente." });
        return;
    };
};

module.exports = {
    validaId,
    validaJogo,
    validaJSON
}