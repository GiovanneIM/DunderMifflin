const express = require('express');
const router = express.Router();
const session = require('express-session');

// Verificando sessões
router.use((req, res, next) => {
    const tiposDeUsuarios = ['gerente', 'empresa', 'admin'];

    for (const tipo of tiposDeUsuarios) {
        if (req.session[tipo]) {
            req.usuario = req.session[tipo];
            req.usuario.tipo = tipo;
            break;
        }
    }

    if (!req.usuario) req.usuario = null;

    next();
});

module.exports = router;