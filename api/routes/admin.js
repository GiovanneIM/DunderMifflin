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

// =========================================================================
// LOGIN

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



// PRODUTOS

// Rota para adicionar um produto
router.post('/adicionar', (req, res) => {
    // Recebendo os dados
    const { nome, preco, marca, categoria, imagem, descricao } = req.body;

    // Validando os dados passados
    if (!nome || !preco || !marca || isNaN(preco) || !categoria[0] || !categoria[1] || !imagem[0]) {
        return res.status(400).json({
            sucesso: false,
            mensagem: 'Campos nome e preço (float) são obrigatórios.'
        });
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
            "marca": marca,
            "categoria": categoria,
            "imagem": imagem,
            "quantidade": 0
        }

        // Adicionando produto à lista
        produtos.push(produto);

        // Criando o HTML da descrição
        const desc = descricao ? descricao : `<div>${nome}</div>`;
        fs.writeFile(`./descricoes/${idNovoProduto}.html`, desc, (err) => {
            if (err) {
                console.error('Erro ao criar o arquivo da descrição:', err);
                return res.status(500).json({
                    sucesso: false,
                    mensagem: 'Erro ao criar arquivo da descrição.'
                });
            }

            // Salvando a lista de produtos
            fs.writeFile(caminhoProdutos, JSON.stringify(produtos, null, 4), (err) => {
                if (err) {
                    console.error('Erro ao salvar produtos:', err);
                    return res.status(500).json({
                        sucesso: true,
                        mensagem: 'Erro ao salvar produtos.'
                    });
                }

                res.status(201).json({
                    sucesso: true,
                    mensagem: 'Produto adicionado com o ID: ' + idNovoProduto,
                    idProduto: idNovoProduto
                });
            });
        });
    })
})

// Rota para atualizar as informações de um produto
router.put('/atualizar/:id', (req, res) => {
    // Recebendo os dados
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({
            sucesso: false,
            mensagem: 'Erro: O ID inserido não era um número.'
        });
    }

    const { produto } = req.body;

    // Validando os dados passados
    if (!produto.nome || !produto.preco || !produto.marca || isNaN(produto.preco)) {
        return res.status(400).json({
            sucesso: false,
            mensagem: 'Campos nome e preço (float) são obrigatórios.'
        });
    }

    // Lendo a lista de produtos
    fs.readFile(caminhoProdutos, 'utf8', (err, data) => {
        // Validando e convertendo o conteúdo do arquivo
        const produtos = v.lerEconverterJSON(err, data, res);
        if (!produtos) { return; }

        // Adicionando produto à lista
        const index = produtos.findIndex(prod => prod.id === id);
        if (index === -1) {
            return res.status(404).json({
                sucesso: false,
                mensagem: 'Produto não encontrado.'
            });
        }

        const quantidade = produtos[index].quantidade;

        produtos[index] = { ...produto, id, quantidade };

        // Salvando a lista de produtos
        fs.writeFile(caminhoProdutos, JSON.stringify(produtos, null, 4), (err) => {
            if (err) {
                console.error('Erro ao salvar produtos:', err);
                return res.status(500).json({
                    sucesso: false,
                    mensagem: 'Erro ao salvar produtos.'
                });
            }

            res.status(201).json({
                sucesso: true,
                mensagem: 'Atualização concluída'
            });
        });
    })
})

// Rota para alterar a quantidade de um produto
router.patch('/:id/quantidade', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({
            sucesso: false,
            mensagem: 'O ID inserido não era um número.'
        });
    }

    const quantidade = parseInt(req.body.quantidade);
    if (isNaN(quantidade)) {
        return res.status(400).json({
            sucesso: false,
            mensagem: 'Erro: A quantidade precisa ser um inteiro.'
        });
    }

    // Lendo a lista de produtos
    fs.readFile(caminhoProdutos, 'utf8', (err, data) => {
        // Validando e convertendo o conteúdo do arquivo
        const produtos = v.lerEconverterJSON(err, data, res);
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
                res.status(500).json({
                    sucesso: false,
                    mensagem: 'Erro: ' + err
                });
            }

            res.status(200).json({
                sucesso: true,
                mensagem: 'Quantidade do produto atualizada'
            });
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
        const descricoes = v.lerEconverterJSON(err, data, res);
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

// Rota para excluir de um produto
router.delete('/produto/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({
            sucesso: false,
            mensagem: 'Erro: O ID inserido não era um número.'
        });
    }

    // Lendo o JSON de descrição
    fs.readFile(caminhoProdutos, 'utf8', (err, data) => {
        // Validando e convertendo o conteúdo do arquivo
        const produtos = v.lerEconverterJSON(err, data, res);
        if (!produtos) { return; }

        // Filtrando todos os produtos que não tiverem o ID passado
        const produtosAposExclusao = produtos.filter(p => p.id !== id);

        // Salvando a lista
        const conteudo = JSON.stringify(produtosAposExclusao, 0, 4);
        fs.writeFile(caminhoProdutos, conteudo, (err) => {
            if (err) {
                console.error('Erro: ' + err);
                res.status(500).json({
                    sucesso: false,
                    mensagem: 'Erro: ' + err
                })
                return
            }

            res.status(200).json({
                sucesso: true,
                mensagem: 'Produto excluído com sucesso'
            });
        });
    })
})


// EMPRESA

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
            "razaoSocial": empresa.razaoSocial,
            "nomeFantasia": empresa.nomeFantasia,
            "cnpj": empresa.cnpj,
            "telefone": empresa.telefone,

            "id": idNovaEmpresa,
            "senha": `Empresa${idNovaEmpresa}`,
            "logo": `https://placehold.co/600x400?text=${empresa.nomeFantasia.replace(' ', '+')}}`,
            "enderecos": [{
                "id": 0,
                "cep": empresa.cep,
                "nome": empresa.nomeFantasia,
                "estado": empresa.estado,
                "cidade": empresa.cidade,
                "numero": empresa.numero,
                "complemento": empresa.complemento
            }]
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