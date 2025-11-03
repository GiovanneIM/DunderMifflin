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
// OBTER LISTA - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

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

// CANCELAR LISTA - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// rota para cancelar uma lista
router.patch('/cancelar/:id', (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            sucesso: false,
            erro: 'ID inválido.'
        });
    }

    const { mensagemCancelamento, tipoUsuario } = req.body;

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

        lista.status = 'Cancelado';

        lista.cancelamento = {
            mensagemCancelamento: mensagemCancelamento,
            responsavel: tipoUsuario,
            data: dataAtual
        };

        // Atualizando o arquivo das listas
        fs.writeFile(caminhoListas, JSON.stringify(listas, null, 4), (err) => {
            if (err) {
                console.error('Erro ao salvar listas:', err);
                return res.status(500).json({
                    sucesso: false,
                    erro: 'Erro ao registrar gerente.'
                });
            }

            res.status(200).json({
                sucesso: true,
                mensagem: 'Lista cancelada com sucesso.',
                lista: lista
            });
        });
    });
});

module.exports = router;






/*
Aguardando aprovação        CINZA       SECONDARY
↓
Aprovado                    AMARELO     WARNING
↓
Enviado                     AZUL        PRIMARY
↓
Entregue                    ROXO        INFO
↓
Recebido                    VERDE       SUCCESS



Cancelado                   VERMELHO    DANGER          •
*/