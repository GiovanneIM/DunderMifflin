const express = require('express');
const app = express();
const port = 4000;




// MIDDLEWARES

// JSON - Leitura de JSON em requisições
app.use(express.json());

// CORS - Middleware para permitir acessar pelo FrontEnd
const cors = require("cors");
app.use(cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"], // endereço do front-end
    credentials: true // Para receber cookies
}));

// Logger
const logger = require('./middlewares/logger.js') 
app.use(logger)

// Autenticação
const autenticacao = require('./middlewares/autenticacao.js');




// ROTAS
const rotasUsuario = require('./routes/produtos.js') // PRODUTOS
app.use('/produtos', rotasUsuario)

const rotasAdmin = require('./routes/admin.js') // ADMIN
app.use('/admin', rotasAdmin)

const rotasEmpresa = require('./routes/empresa.js') // EMPRESA CLIENTE
app.use('/empresas', rotasEmpresa)

const rotasGerente = require('./routes/gerente.js') // GERENTE DE COMPRAS
app.use('/gerentes', rotasGerente)

const rotasLista = require('./routes/lista.js') // LISTAS
app.use('/listas', rotasLista)




// INICIANDO O SERVIDOR
app.listen(port, () => {
    console.log(`Servidor ativo em: http://localhost:${port}`);
});
