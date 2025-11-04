const express = require('express');
const router = express.Router();

const fs = require('fs');

// Validações
const v = require('../js/validacoes.js')

// Arquivos
const caminhoEmpresas = './json/empresas.json'
const caminhoGerentes = './json/gerentes.json'
const caminhoListas = './json/listas.json'

// =========================================================================
// LOGIN - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

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

    // Lendo os gerentes
    fs.readFile(caminhoGerentes, 'utf-8', (err, data) => {
        const gerentes = v.lerEconverterJSON(err, data, res);
        if (!gerentes) { return }

        // Procurando pelo gerente
        const gerente = gerentes.find((ger) => { return ger.id === id });

        // Verificando se o gerente foi encontrado e se a senha está certa
        if (!gerente || gerente.senha !== senha) {
            res.status(401).json({
                sucesso: false,
                mensagem: 'ID e/ou senha incorretos.'
            });
            return;
        }

        // Verificando se o gerente está ativo
        if(!empresa.ativo){
            res.status(401).json({
                sucesso: false,
                mensagem: 'Seu registro está inativo. Entre em contato com sua empresa.'
            });
            return
        }

        // Login bem sucedido
        console.log(`Gerente (${gerente.id}) - ${gerente.nome} logado.`);
        res.status(200).json({
            sucesso: true,
            usuario: { "id": gerente.id, "tipo": "gerente", "nome": gerente.nomeCompleto }
        });
    })
});

// GERENTE - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Rota para obter UM GERENTE específico
router.get('/:id', (req, res) => {
    // Recebendo e validando o id
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({
            sucesso: false,
            erro: 'O ID inserido não era um número.'
        });
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
            res.status(200).json({
                sucesso: true,
                gerente: gerente
            });
        } else {
            res.status(404).json({
                sucesso: false,
                erro: 'Gerente não encontrado.'
            });
        }
    });
});

// ATUALIZAR GERENTE - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// Rota para atualizar nome, usuário, email e telefone de um gerente
router.patch('/:id/dados', (req, res) => {
    // Recebendo e validando o id
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({
            sucesso: false,
            erro: 'O ID inserido não era um número.'
        });
    }

    const { nomeCompleto, nomeUsuario, email, telefone } = req.body

    // Lendo a lista de gerentes
    fs.readFile(caminhoGerentes, 'utf8', (err, data) => {
        const gerentes = v.lerEconverterJSON(err, data, res)
        if (!gerentes) {
            return
        }

        // Procurando o gerente na lista de gerentes
        const gerente = gerentes.find((emp) => emp.id === id)
        if (!gerente) {
            return res.status(404).json({
                sucesso: false,
                erro: 'Empresa não encontrada.'
            });
        }

        gerente.nomeCompleto = nomeCompleto;
        gerente.nomeUsuario = nomeUsuario;
        gerente.telefone = telefone;
        gerente.email = email;

        // Salvando a lista de gerentes
        fs.writeFile(caminhoGerentes, JSON.stringify(gerentes, null, 4), (err) => {
            if (err) {
                console.error('Erro ao salvar gerentes:', err);
                return res.status(500).json({
                    sucesso: false,
                    erro: 'Erro ao atualizar gerente.'
                });
            }

            res.status(200).json({
                sucesso: true,
                mensagem: 'Dados atualizados com sucesso.'
            });
        });
    });
});


// LISTA - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Rota para obter as listas do gerente
router.get('/:id/listas', (req, res) => {
    // Recebendo o ID do gerente
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({
            sucesso: false,
            erro: 'O ID inserido não era um número.'
        });
    }

    // Lendo o arquivo das listas
    fs.readFile(caminhoListas, 'utf8', (err, data) => {
        const listas = v.lerEconverterJSON(err, data, res)
        if (!listas) { return }

        // Filtrando as listas do gerente
        const listasDoGerente = listas.filter((l) => l.idGerente === id)

        // Enviando as empresas
        res.status(200).json({
            sucesso: true,
            mensagem: 'Listas encontradas com sucesso',
            listas: listasDoGerente ?? []
        })
    });
})

// Rota para criar uma lista
router.post('/listas', (req, res) => {
    // Recebendo as informações da lista
    const { idGerente, idEmpresa, produtos, mensagemPedido, total } = req.body;


    // Lendo o arquivo das listas
    fs.readFile(caminhoListas, 'utf8', (err, data) => {
        const listas = v.lerEconverterJSON(err, data, res)
        if (!listas) { return }

        // Data atual
        const dataAtual = new Date().toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }).replace(',', ' -');

        // Criando o ID da lista
        const idNovaLista = listas.length ? listas[listas.length - 1].id + 1 : 0;

        // Filtrando as listas do gerente
        const novaLista = {
            id: idNovaLista,

            idGerente,
            idEmpresa,
            produtos,
            mensagem: { mensagemGerente: mensagemPedido?? "Sem comentário."},
            total,

            status: "Aguardando aprovação",
            datas: {
                "pedido": dataAtual
            }
        }

        listas.push(novaLista);

        // Atualizando o arquivo das listas
        fs.writeFile(caminhoListas, JSON.stringify(listas, null, 4), (err) => {
            if (err) {
                console.error('Erro ao salvar listas:', err);
                return res.status(500).json({
                    sucesso: false,
                    erro: 'Erro ao registrar gerente.'
                });
            }

            res.status(201).json({
                sucesso: true,
                mensagem: 'lista cadastrada com sucesso.',
                idLista: idNovaLista
            });
        });
    });
})

// Rota para marcar um pedido como RECEBIDO
router.patch('/receber/:id', (req, res) => {
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

        // Data atual
        const dataAtual = new Date().toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }).replace(',', ' -');

        lista.status = "Recebido"
        lista.datas.recebido = dataAtual;


        // Atualizando o arquivo das listas
        fs.writeFile(caminhoListas, JSON.stringify(listas, null, 4), (err) => {
            if (err) {
                console.error('Erro ao salvar listas:', err);
                return res.status(500).json({
                    sucesso: false,
                    erro: 'Erro ao salvar a lista recebida.'
                });
            }

            res.status(200).json({
                sucesso: true,
                mensagem: 'Lista recebida com sucesso.',
                lista
            });
        });
    });
});

module.exports = router;