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

    fs.readFile(caminhoEmpresas, 'utf-8', (err, data) => {
        const empresas = v.lerEconveterJSON(err, data, res);
        if (!empresas) { return }

        const empresa = empresas.find((emp) => { return emp.id === id });

        if (!empresa || empresa.senha !== senha) {
            res.status(401).send('ID e/ou senha incorretos.');
            return;
        }

        req.session.empresa = empresa;
        console.log(`Empresa (${empresa.id}) ${empresa.nome} logada com sucesso.`);
        res.send(`Empresa (${empresa.id}) ${empresa.nome} logada com sucesso.`);
    })
});


// Rota para obter os gerente de compras da empresa
router.post('/gerente', (req, res) => {
})

// Rota para adicionar um novo gerente de compras
router.post('/gerente', (req, res) => {
})

// Rota para excluir um gerente de compras
router.delete('/gerente', (req, res) => {
})



router.get('/', (req, res) => {
    console.log(req.session);
    res.send('Sessão atual: ' + JSON.stringify(req.session));
});



module.exports = router;
