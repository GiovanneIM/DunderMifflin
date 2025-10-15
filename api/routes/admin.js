const express = require('express');
const router = express.Router();

const fs = require('fs');
const caminhoProdutos = './json/produtos.json';
const caminhoDescricao = './json/descricoes.json';

const v = require('../js/validacoes.js')


// ADICIONAR PRODUTO
router.post('/adicionar', (req, res) => {
    // Recebendo os dados
    const { nome, preco, marca } = req.body;

    // Validando os dados passados
    if (!nome || !preco || !marca || isNaN(preco)) {
        return res.status(400).json({ erro: 'Campos nome e preço (float) são obrigatórios.' });
    }

    // Lendo a lista de produtos
    fs.readFile(caminhoProdutos, 'utf8', (err, data) => {
        // Validando e convertendo o conteúdo do arquivo
        const produtos = v.lerEconverterJSON(res, err, data);
        if (!produtos) { return; }

        // Criando um novo produto
        let idNovoProduto;
        try {
            idNovoProduto = produtos[produtos.length - 1].id + 1;
        } catch (error) {
            idNovoProduto = 0;
        }

        const produto = {
            "id": idNovoProduto,
            "nome": nome,
            "preco": preco,
            "marca": marca,
            "categoria": [],
            "imagem": [],
            "quantidade": 0
        }

        // Adicionando produto à lista
        produtos.push(produto);

        // Criando o HTML da descrição
        const descricao = `<div>${nome}</div>`;
        fs.writeFile(`./descricoes/${idNovoProduto}.html`, descricao, (err) => {
            if (err) {
                console.error('Erro ao criar o arquivo da descrição:', err);
                return res.status(500).send('Erro ao criar arquivo da descrição.');
            }

            // Salvando a lista de produtos
            fs.writeFile(caminhoProdutos, JSON.stringify(produtos, null, 4), (err) => {
                if (err) {
                    console.error('Erro ao salvar produtos:', err);
                    return res.status(500).send('Erro ao salvar produtos.');
                }

                res.status(201).send('Produto adicionado com o ID: ' + idNovoProduto);
            });
        });
    })
})

// ADICIONAR E REMOVER IMAGENS
router.patch('/:id/imagem', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).send('Erro: O ID inserido não era um número.');
    }

    const { imagem, remover } = req.body;

    if (!imagem) {
        return res.status(400).send('Erro: Campo "imagem" é obrigatório.');
    }

    fs.readFile(caminhoProdutos, 'utf8', (err, data) => {
        const produtos = v.lerEconverterJSON(res, err, data);
        if (!produtos) return;

        // Busca o produto pelo ID
        const produto = produtos.find(p => p.id === id);
        if (!produto) {
            return res.status(404).send('Produto não encontrado.');
        }

        // REMOVER IMAGEM
        if (remover === true) {
            // Procurando o ID da imagem no vetor imagens
            const index = produto.imagem.indexOf(imagem);

            // Se a imagem não for encontrada
            if (index === -1) {
                return res.status(404).send('A imagem informada não foi encontrada no produto.');
            }

            // Removendo a imagem
            produto.imagem.splice(index, 1);
        }

        // ADICIONAR IMAGEM
        else {
            // Verifica se a imagem já está no vetor
            if (produto.imagem.includes(imagem)) {
                return res.status(400).send('A imagem já está cadastrada neste produto.');
            }

            produto.imagem.push(imagem);
        }

        // Salvando a lista
        fs.writeFile(caminhoProdutos, JSON.stringify(produtos, null, 4), (err) => {
            if (err) {
                console.error('Erro ao salvar arquivo:', err);
                return res.status(500).send('Erro ao salvar produto.');
            }

            res.status(200).json({
                mensagem: remover ? 'Imagem removida do produto' : 'Imagem adicionada ao produto'
            });
        });
    });
})

// ATUALIZAR QUANTIDADE
router.patch('/:id/quantidade', (req, res) => {
    // Recebendo a imagem
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).send('Erro: O ID inserido não era um número.');
    }

    const quantidade = parseInt(req.body.quantidade);
    if (isNaN(quantidade)) {
        return res.status(400).send('Erro: A quantidade precisa ser um inteiro.');
    }

    // Lendo a lista de produtos
    fs.readFile(caminhoProdutos, 'utf8', (err, data) => {
        // Validando e convertendo o conteúdo do arquivo
        const produtos = v.lerEconverterJSON(res, err, data);
        if (!produtos) { return; }

        // Procurando e alterando a quantidade do produto
        produtos.find((produto) => {
            if (produto.id === id) {
                produto.quantidade += quantidade;
                return true;
            }
            return false;
        })

        // Salvando a lista
        const conteudo = JSON.stringify(produtos, 0, 4);
        fs.writeFile(caminhoProdutos, conteudo, (err) => {
            if (err) {
                console.error('Erro: ' + err);
                res.status(500).send('Erro: ' + err)
            }

            res.status(200).send('Quantidade do produto atualizada');
        });
    })
})

// ALTERAR A DESCRIÇÃO DO PRODUTO
router.put('/:id/descricao', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).send('Erro: O ID inserido não era um número.');
    }

    const { descricao } = req.body;
    if (!descricao) {
        return res.status(400).send('Erro: A "descricao" é obrigatória.');
    }

    // Lendo o JSON de descrição
    fs.readFile(caminhoProdutos, 'utf8', (err, data) => {
        // Validando e convertendo o conteúdo do arquivo
        const descricoes = v.lerEconverterJSON(res, err, data);
        if (!descricoes) { return; }

        const produto = produtos.find(p => p.id_produto === id);
        if (!produto) {
            return res.status(404).send('Erro: Produto não encontrado.');
        }

        produto.descricao = descricao;

        // Salvando a lista
        const conteudo = JSON.stringify(descricoes, 0, 4);
        fs.writeFile(caminhoProdutos, conteudo, (err) => {
            if (err) {
                console.error('Erro: ' + err);
                res.status(500).send('Erro: ' + err)
            }

            res.status(200).send('Descrição do produto atualizada');
        });
    })
})



module.exports = router;