const express = require('express');
const router = express.Router();

const fs = require('fs');

// Validações
const v = require('../js/validacoes.js')

const caminhoEmpresas = './json/empresas.json'
const caminhoGerentes = './json/gerentes.json'

// ROTAS

// Rota para fazer login
router.post('/login', (req, res) => {
    const { id, senha } = req.body;
    
    if (isNaN(id) || !senha) {
        return res.status(400).send('ID e/ou senha incorretos.');
    }

    fs.readFile(caminhoGerentes, 'utf-8', (err, data) => {
        const gerentes = v.lerEconverterJSON(err, data, res);
        if (!gerentes) { return }

        const gerente = gerentes.find((ger) => { return ger.id === id });

        if (!gerente || gerente.senha !== senha) {
            res.status(401).send('ID e/ou senha incorretos.');
            return;
        }

        req.session.gerente = gerente;
        console.log(`Gerente ${gerente.nome} - ${gerente.id} logado com sucesso.`);
        res.status(200).send(`Gerente ${gerente.nome} - ${gerente.id} logado com sucesso.`);
    })
});


module.exports = router;