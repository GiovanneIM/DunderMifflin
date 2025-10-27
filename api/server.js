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




// INICIANDO O SERVIDOR
app.listen(port, () => {
    console.log(`Servidor ativo em: http://localhost:${port}`);
});
















/*

Papelaria e escrita

    Canetas (esferográficas, marca-texto, corretivas, pincéis, etc.)

    Lápis e lapiseiras

    Borrachas, apontadores

    Cadernos, blocos, agendas

    Papel A4 / A3 (sulfite, reciclado, fotográfico, colorido)

    Post-its e etiquetas adesivas

Arquivamento e organização

    Pastas (suspensas, catálogo, sanfonadas, elásticas)

    Fichários e refis

    Divisórias

    Clipes, grampos, elásticos

    Caixas organizadoras

    Arquivos de aço e gaveteiros

Suprimentos de informática e impressão

    Toners e cartuchos (HP, Epson, Canon, Brother, etc.)

    Papéis especiais (fotográfico, etiquetas, adesivos)

    Mídias (pendrives, HDs externos, DVDs, etc.)

    Teclados, mouses, cabos, adaptadores

    Suportes para monitor e notebook

    Extensões e filtros de linha

Mobiliário de escritório

    Mesas e escrivaninhas

    Cadeiras ergonômicas

    Armários e arquivos metálicos

    Estações de trabalho

    Suportes de monitor e organizadores de mesa

Copa e limpeza corporativa

    Copos descartáveis, guardanapos, talheres

    Cafés, açúcar, adoçante, chá

    Produtos de limpeza (álcool, detergente, desinfetante)

    Papel higiênico, papel toalha

    Sacos de lixo

Equipamentos e utilidades

    Calculadoras

    Tesouras, estiletes e refis

    Grampeadores e perfuradores

    Quadros brancos e murais de avisos

    Seladoras e balanças (para envios e embalagens)
*/