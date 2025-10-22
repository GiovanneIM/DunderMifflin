const express = require('express');
const router = express.Router();

const fs = require('fs');

// Validações
const v = require('../js/validacoes.js')

// Arquivos
const caminhoEmpresas = './json/empresas.json'
const caminhoGerentes = './json/gerentes.json'

// ROTAS

// Rota para fazer login
router.post('/login', (req, res) => {
    // Recebendo as informações de login
    const { id, senha } = req.body;

    // Validando as informações
    if (isNaN(id) || !senha) {
        return res.status(400).send('ID e/ou senha incorretos.');
    }

    // Lendo os gerentes
    fs.readFile(caminhoGerentes, 'utf-8', (err, data) => {
        const gerentes = v.lerEconverterJSON(err, data, res);
        if (!gerentes) { return }

        // Procurando pelo gerente
        const gerente = gerentes.find((ger) => { return ger.id === id });

        // Verificando se o gerente foi encontrado e se a senha está certa
        if (!gerente || gerente.senha !== senha) {
            res.status(401).send('ID e/ou senha incorretos.');
            return;
        }

        // Login bem sucedido
        console.log(`Gerente (${gerente.id}) - ${gerente.nome} logado.`);
        res.status(200).json({
            "sucesso": true,
            "usuario": { "id": gerente.id, "tipo": "gerente", "nome": gerente.nome }
        });
    })
});

// Rota para obter todos os gerentes
router.get('/', (req, res) => {
    // Lendo a lista de gerentes
    fs.readFile(caminhoGerentes, 'utf8', (err, data) => {
        const gerentes = v.lerEconverterJSON(err, data, res)
        if (!gerentes) { return }

        // Enviando as gerentes
        res.status(200).json(gerentes)
    });
});

// Rota para obter UM GERENTE específico
router.get('/:id', (req, res) => {
    // Recebendo e validando o id
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ erro: 'O ID inserido não era um número.'});
    }

    // Lendo a lista de gerentes
    fs.readFile(caminhoGerentes, 'utf8', (err, data) => {
        const gerentes = v.lerEconverterJSON(err, data, res)
        if (!gerentes) {
            return
        }

        // Procurando o gerente na lista de gerentes
        const gerente = gerentes.find((ger) => ger.id === id)

        // Verificando se o gerente foi encontrado e enviando como resposta
        if (gerente) {
            res.status(200).json({ gerente });
        } else {
            res.status(404).json({ erro: 'Gerente não encontrado.' });
        }
    });
});

module.exports = router;