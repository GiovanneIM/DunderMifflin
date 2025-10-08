const express = require('express')
const app = express()
const port = 4000


// MIDDLEWARES
const logger = require('./middlewares/logger.js')
app.use(logger)

const autenticacao = require('./middlewares/autenticacao.js')


// ROTAS
const rotasUsuario = require('./routes/produtos.js')
app.use('/produtos', rotasUsuario)

const rotasAdmin = require('./routes/admin.js')
app.use('/admin', rotasAdmin)


// INICIANDO O SERVIDOR
app.listen(port, () => { 
    console.log(`Servidor ativo em: http://localhost:${port}`); 
});