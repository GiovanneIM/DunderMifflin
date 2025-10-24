const express = require('express');
const router = express.Router();

const fs = require('fs');

// Validações
const v = require('../js/validacoes.js')

// Arquivos
const caminhoAdmins = './json/admins.json'
const caminhoEmpresas = './json/empresas.json'
const caminhoGerentes = './json/gerentes.json'
const caminhoProdutos = './json/produtos.json';

// ROTAS

// Rota para fazer login
router.post('/login', (req, res) => {
    // Recebendo as informações de login
    const { id, senha } = req.body;

    // Validando as informações
    if (isNaN(id) || !senha) {
        res.status(400).json({
            sucesso: false,
            mensagem: 'ID e/ou senha incorretos.'
        });
        return
    }

    // Lendo os admin
    fs.readFile(caminhoAdmins, 'utf-8', (err, data) => {
        const admins = v.lerEconverterJSON(err, data, res);
        if (!admins) { return }

        // Procurando pelo admin
        const admin = admins.find((emp) => { return emp.id === id });

        // Verificando se o admin não foi encontrado ou se a senha está certa
        if (!admin || admin.senha !== senha) {
            res.status(401).json({
                sucesso: false,
                mensagem: 'ID e/ou senha incorretos.'
            });
            return
        }

        // Login bem sucedido
        console.log(`Admin (${admin.id}) - ${admin.nome} logado.`);
        res.status(200).json({
            sucesso: true,
            usuario: { id: admin.id, tipo: "admin", nome: admin.nome }
        });
    })
});

// Rota para adicionar um produto
router.post('/adicionar', (req, res) => {
    // Recebendo os dados
    const { nome, preco, marca, categoria, imagem } = req.body;

    // Validando os dados passados
    if (!nome || !preco || !marca || isNaN(preco)) {
        return res.status(400).json({ erro: 'Campos nome e preço (float) são obrigatórios.' });
    }

    // Lendo a lista de produtos
    fs.readFile(caminhoProdutos, 'utf8', (err, data) => {
        // Validando e convertendo o conteúdo do arquivo
        const produtos = v.lerEconverterJSON(err, data, res);
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
            "marca": marca ? marca : "",
            "categoria": categoria ? categoria : [],
            "imagem": imagem ? imagem : [],
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

// Rota para atualizar as informações de um produto
router.put('/atualizar/:id', (req, res) => {
    // Recebendo os dados
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).send('Erro: O ID inserido não era um número.');
    }

    const { produto } = req.body;

    // Validando os dados passados
    if (!produto.nome || !produto.preco || !produto.marca || isNaN(produto.preco)) {
        return res.status(400).json({ erro: 'Campos nome e preço (float) são obrigatórios.' });
    }

    // Lendo a lista de produtos
    fs.readFile(caminhoProdutos, 'utf8', (err, data) => {
        // Validando e convertendo o conteúdo do arquivo
        const produtos = v.lerEconverterJSON(err, data, res);
        if (!produtos) { return; }

        // Adicionando produto à lista
        const index = produtos.findIndex(prod => prod.id === id);
        if (index === -1) {
            return res.status(404).send('Produto não encontrado.');
        }

        produtos[index] = { ...produto, id };

        // Salvando a lista de produtos
        fs.writeFile(caminhoProdutos, JSON.stringify(produtos, null, 4), (err) => {
            if (err) {
                console.error('Erro ao salvar produtos:', err);
                return res.status(500).send('Erro ao salvar produtos.');
            }

            res.status(201).send('Produto atualzado!');
        });
    })
})

// Rota para alterar a quantidade de um produto
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

// Rota para alterar a descrição de um produto
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

// Rota para registrar um empresa
router.post('/registrarEmpresa', (req, res) => {
    // Recebendo os dados
    const { empresa } = req.body;

    // Lendo a lista de empresas
    fs.readFile(caminhoEmpresas, 'utf8', (err, data) => {
        // Validando e convertendo o conteúdo do arquivo
        const empresas = v.lerEconverterJSON(err, data, res);
        if (!empresas) { return; }

        // Descobrindo o id da empresa
        let idNovaEmpresa;
        try {
            idNovaEmpresa = empresas[empresas.length - 1].id + 1;
        } catch (error) {
            idNovaEmpresa = 0;
        }

        const emp = {
            ...empresa,
            "id": idNovaEmpresa,
            "senha": `Empresa${idNovaEmpresa}`
        }

        // Adicionando produto à lista
        empresas.push(emp);

        // Salvando a lista de empresas
        fs.writeFile(caminhoEmpresas, JSON.stringify(empresas, null, 4), (err) => {
            if (err) {
                console.error('Erro ao salvar empresas:', err);
                return res.status(500).send('Erro ao registrar empresa.');
            }

            res.status(201).json({ "id": emp.id, "senha": emp.senha });
        });
    })
})

module.exports = router;