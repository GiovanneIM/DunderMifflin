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
        res.status(200).send(`Empresa (${empresa.id}) ${empresa.nome} logada com sucesso.`);
    })
});

// Rota para obter todas as empresas
router.get('/', (req, res) => {
    // Lendo a lista de tarefas
    fs.readFile(caminhoProdutos, 'utf8', (err, data) => {
        // Lendo e convertendo o conteúdo do JSON com os produtos
        const produtos = v.lerEconverterJSON(err, data, res)
        if (!produtos) { return }

        // Enviando os produtos
        res.status(200).json(produtos)
    });
});

// Rota para obter UMA EMPRESA específica
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id) ) {
        return res.status(400).send('Erro: O ID inserido não era um número.');
    }

    // Lendo a lista de empresas
    fs.readFile(caminhoEmpresas, 'utf8', (err, data) => {
        // Lendo e convertendo o conteúdo do JSON com as empresas
        const empresas = v.lerEconverterJSON(err, data, res)
        // Verificando se a lista foi lida
        if (!empresas) {
            return
        }

        // Procurando o empresa na lista de empresas
        const empresa = empresas.find((emp) => emp.id === id)

        // Verificando se o empresa foi encontrado e enviando como resposta
        if (empresa) {
            res.status(200).json({ empresa });
        } else {
            res.status(404).json({ erro: 'Empresa não encontrada.' });
        }
    });
});

// Rota para obter os gerente de compras da empresa
router.get('/gerente', (req, res) => {
    fs.readFile(caminhoGerentes, 'utf-8', (err, data) => {
        const gerentes = v.lerEconveterJSON(err, data, res);
        if (!gerentes) { return }

        const gerenteEmpresa = gerentes.filter((ger) => { return ger.idEmpresa === req.session.empresa.id });

        res.status(200).json(gerenteEmpresa)
    })
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
