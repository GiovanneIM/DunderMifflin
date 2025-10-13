const express = require('express');
const router = express.Router();

const fs = require('fs');

// Caminho para o JSON de produtos
const caminhoProdutos = './json/produtos.json';

// Validações
const v = require('../js/validacoes.js')



// ROTAS
// Rota para obter TODOS os produtos
router.get('/', (req, res) => {
    // Lendo a lista de tarefas
    fs.readFile(caminhoProdutos, 'utf8', (err, data) => {
        // Lendo e convertendo o conteúdo do JSON com os produtos
        const produtos = v.lerEconveterJSON(err, data, res)
        if (!produtos) { return }

        // Enviando os produtos
        res.status(200).json(produtos)
    });
});

// Rota para obter UM PRODUTO ESPECIFICO e sua DESCRICAO
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id) ) {
        return res.status(400).send('Erro: O ID inserido não era um número.');
    }

    // Lendo a lista de tarefas
    fs.readFile(caminhoProdutos, 'utf8', (err, data) => {
        // Lendo e convertendo o conteúdo do JSON com os produtos
        const produtos = v.lerEconveterJSON(err, data, res)
        // Verificando se a lista foi lida
        if (!produtos) {
            return
        }

        // Procurando o produto na lista de produtos
        const produto = produtos.find((prod) => prod.id === id)

        // Verificando se o produto foi encontrado e enviando como resposta
        if (produto) {
            fs.readFile(`./descricoes/${id}.html`, 'utf-8', (errD, descricao) => {
                if (!descricao) {
                    descricao=""
                }

                res.status(200).json({produto, descricao});
            })
        }
        else {
            res.status(404).send('Produto não encontrado');
        }
    });
});


// OPTIONS

router.options('/', (req, res) => {
    res.header('Allow', 'GET');
    res.status(204).send();
})

router.options('/:id', (req, res) => {
    res.header('Allow', 'GET');
    res.status(204).send();
})


module.exports = router