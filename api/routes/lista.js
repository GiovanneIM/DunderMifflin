const express = require('express');
const router = express.Router();

const fs = require('fs');

// Validações
const v = require('../js/validacoes.js')

// Arquivos
const caminhoEmpresas = './json/empresas.json'
const caminhoGerentes = './json/gerentes.json'
const caminhoListas = './json/listas.json'

// ==========================================================================

// rota para obter uma lista específica
router.get('/:id', (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            sucesso: false,
            erro: 'ID inválido.'
        });
    }

    fs.readFile(caminhoListas, 'utf8', (err, data) => {
        const listas = v.lerEconverterJSON(err, data, res);
        if (!listas) return;

        const lista = listas.find(l => l.id === id);

        if (!lista) {
            return res.status(404).json({
                sucesso: false,
                erro: 'Lista não encontrada.'
            });
        }

        res.status(200).json({
            sucesso: true,
            lista
        });
    });
});


module.exports = router;