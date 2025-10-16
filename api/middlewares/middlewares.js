const express = require('express')
const router = express.Router();


// Middleware para permitir acessar pelo FrontEnd
const cors = require("cors");
router.use(cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"], // endereço do front-end
    credentials: true // Para enviar cookies/sessões
}));


// SESSÃO
const sessao = require('./sessao.js') 
router.use(sessao)

// const session = require('express-session');
// router.use(session({
//     secret: 'segredo',
//     resave: false,
//     saveUninitialized: false,
//     cookie: { maxAge: 1000 * 60 * 60 * 24 } // A sessão expira em 1 dia
// }));


// // Verificando sessão
// router.use((req, res, next) => {
//     if (req.session.usuarioId) {
//         req.usuario = usuarios.find(u => u.ID === req.session.usuarioId);
//     }
//     next();
// });


// LOGGER
const logger = require('./logger.js') 
router.use(logger)


// LEITURA DE JSON EM REQUISIÇÕES
router.use(express.json()); 


module.exports = router