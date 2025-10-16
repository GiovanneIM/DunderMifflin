const express = require('express');
const router = express.Router();
const session = require('express-session');

router.use(session({
    secret: 'segredo',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // A sessão expira em 1 dia
}));

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

    next();
});

module.exports = router;