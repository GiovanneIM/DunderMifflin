const express = require('express');
const router = express.Router();

const fs = require('fs');

// Validações
const v = require('../js/validacoes.js')

// Caminhos dos JSON's
const caminhoEmpresas = './json/empresas.json'
const caminhoGerentes = './json/gerentes.json'
const caminhoAdmins = './json/admins.json'

// Rota para fazer login
router.post('/login', (req, res) => {
    const { id, senha, tipoLogin } = req.body;

     if (['gerente', 'empresa', 'admin'].some(tipo => req.session[tipo])) {
        res.status(400).send('Já há um usuário logado.');
        return;
    }

    if (isNaN(id) || !senha) {
        res.status(400).send('ID e/ou senha incorretos.');
        return;
    }

    const caminhos = {
        empresa: caminhoEmpresas,
        gerente: caminhoGerentes,
        admin: caminhoAdmins
    };

    fs.readFile(caminhos[tipoLogin], 'utf-8', (err, data) => {
        const usuariosDoTipo = v.lerEconveterJSON(err, data, res);
        if (!usuariosDoTipo) { return }

        const usuario = usuariosDoTipo.find((emp) => { return emp.id === id });

        if (!usuario || usuario.senha !== senha) {
            res.status(401).send('ID e/ou senha incorretos.');
            return;
        }

        req.session[tipoLogin] = usuario;
        req.session[tipoLogin].tipo = tipoLogin;

        console.log(`${tipoLogin} (${usuario.id}) ${usuario.nome} logado (a) com sucesso.`);
        console.log("Session ID atual:", req.sessionID);
        res.status(200).send(`${tipoLogin} (${usuario.id}) ${usuario.nome} logado (a) com sucesso.`);
    })
});

// Rota para verificar se há um usuário logado
router.get('/verificar-login', (req, res) => {

    if (req.usuario) {
        // Respondendo que há um usuário logado, passando as informações dele e o tipo
        res.json({ logado: true, usuario: req.usuario, tipo: req.usuario.tipo });
    }
    else {
        // Respondendo que não há um usuário logado
        res.json({ logado: false });
    }

});

module.exports = router;