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

    // Lendo as empresas
    fs.readFile(caminhoEmpresas, 'utf-8', (err, data) => {
        const empresas = v.lerEconveterJSON(err, data, res);
        if (!empresas) { return }

        // Procurando pela empresa
        const empresa = empresas.find((emp) => { return emp.id === id });

        // Verificando se a empresa foi encontrada e se a senha está certa
        if (!empresa || empresa.senha !== senha) {
            res.status(401).send('ID e/ou senha incorretos.');
            return;
        }

        // Login bem sucedido
        console.log(`Empresa (${empresa.id}) - ${empresa.nome} logada.`);
        res.status(200).json({
            "sucesso": true,
            "usuario": { "id": empresa.id, "tipo": "empresa", "nome": empresa.nomeFantasia }
        });
    })
});

// Rota para obter todas as empresas
router.get('/', (req, res) => {
    // Lendo a lista de empresas
    fs.readFile(caminhoEmpresas, 'utf8', (err, data) => {
        const empresas = v.lerEconverterJSON(err, data, res)
        if (!empresas) { return }

        // Enviando as empresas
        res.status(200).json(empresas)
    });
});

// Rota para obter UMA EMPRESA específica
router.get('/:id', (req, res) => {
    // Recebendo e validando o id
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ erro: 'O ID inserido não era um número.'});
    }

    // Lendo a lista de empresas
    fs.readFile(caminhoEmpresas, 'utf8', (err, data) => {
        const empresas = v.lerEconverterJSON(err, data, res)
        if (!empresas) {
            return
        }

        // Procurando a empresa na lista de empresas
        const empresa = empresas.find((emp) => emp.id === id)

        // Verificando se a empresa foi encontrada e enviando como resposta
        if (empresa) {
            res.status(200).json({ empresa });
        } else {
            res.status(404).json({ erro: 'Empresa não encontrada.' });
        }
    });
});

// Rota para obter os gerente de compras da empresa
router.get('/gerentes', (req, res) => {
    const { idEmpresa } = req.body;
    if (isNaN(id)) {
        return res.status(400).json({ erro: 'O ID inserido não era um número.'});
    }

    fs.readFile(caminhoGerentes, 'utf-8', (err, data) => {
        const gerentes = v.lerEconveterJSON(err, data, res);
        if (!gerentes) { return }

        const gerentesEmpresa = gerentes.filter((ger) => { return ger.idEmpresa === idEmpresa });

        res.status(200).json(gerentesEmpresa)
    })
})

// Rota para adicionar um novo gerente de compras
router.post('/gerente', (req, res) => {
})

// Rota para excluir um gerente de compras
router.delete('/gerente', (req, res) => {
})



module.exports = router;
