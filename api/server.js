const express = require('express');
const app = express();
const port = 4000;

// Arquivos
const caminhoEmpresas = './json/empresas.json'
const caminhoGerentes = './json/gerentes.json'

// MIDDLEWARES
const middlewares = require('./middlewares/middlewares.js');
app.use(middlewares);

// Autenticação
const autenticacao = require('./middlewares/autenticacao.js');



// Rota para fazer login
app.post('/login', (req, res) => {
    const { id, senha, tipoLogin } = req.body;

    if (isNaN(id) || !senha) {
        return res.status(400).send('ID e/ou senha incorretos.');
    }

    if (tipoLogin === 'empresa') {
        fs.readFile(caminhoEmpresas, 'utf-8', (err, data) => {
            const empresas = v.lerEconveterJSON(err, data, res);
            if (!empresas) { return }

            const empresa = empresas.find((emp) => { return emp.id === id });

            if (!empresa || empresa.senha !== senha) {
                res.status(401).send('ID e/ou senha incorretos.');
                return;
            }

            req.session.empresa = empresa;
            console.log(`Empresa (${empresa.id}) ${empresa.nome} logada com sucesso.`);
            res.status(200).send(`Empresa (${empresa.id}) ${empresa.nome} logada com sucesso.`);
        })
    }
    else if (tipoLogin === 'gerente') {
        fs.readFile(caminhoGerentes, 'utf-8', (err, data) => {
            const gerentes = v.lerEconveterJSON(err, data, res);
            if (!gerentes) { return }

            const gerente = gerentes.find((emp) => { return emp.id === id });

            if (!gerente || gerente.senha !== senha) {
                res.status(401).send('ID e/ou senha incorretos.');
                return;
            }

            req.session.gerente = gerente;
            console.log(`Gerente (${gerente.id}) ${gerente.nome} logada com sucesso.`);
            res.status(200).send(`Gerente (${gerente.id}) ${gerente.nome} logada com sucesso.`);
        })
    }
});


// ROTAS
const rotasUsuario = require('./routes/produtos.js') // PRODUTOS
app.use('/produtos', rotasUsuario)

const rotasAdmin = require('./routes/admin.js') // ADMIN
app.use('/admin', rotasAdmin)

const rotasEmpresa = require('./routes/empresa.js') // EMPRESA CLIENTE
app.use('/empresa', rotasEmpresa)

const rotasGerente = require('./routes/gerente.js') // GERENTE DE COMPRAS
app.use('/gerente', rotasGerente)



// INICIANDO O SERVIDOR
app.listen(port, () => {
    console.log(`Servidor ativo em: http://localhost:${port}`);
});
















/*


Um site B2B (business-to-business) de materiais de escritório não vende para o consumidor final, mas sim para empresas, escolas, escritórios contábeis, indústrias, órgãos públicos, clínicas, etc.

Então o foco deve ser produtos em volume, reposição constante e atendimento corporativo (faturas, pedidos recorrentes, orçamento via CNPJ, etc).

🧩 Categorias e produtos que um B2B de escritório pode vender
🖊️ Papelaria e escrita

Canetas (esferográficas, marca-texto, corretivas, pincéis, etc.)

Lápis e lapiseiras

Borrachas, apontadores

Cadernos, blocos, agendas

Papel A4 / A3 (sulfite, reciclado, fotográfico, colorido)

Post-its e etiquetas adesivas

📚 Arquivamento e organização

Pastas (suspensas, catálogo, sanfonadas, elásticas)

Fichários e refis

Divisórias

Clipes, grampos, elásticos

Caixas organizadoras

Arquivos de aço e gaveteiros

🧾 Suprimentos de informática e impressão

Toners e cartuchos (HP, Epson, Canon, Brother, etc.)

Papéis especiais (fotográfico, etiquetas, adesivos)

Mídias (pendrives, HDs externos, DVDs, etc.)

Teclados, mouses, cabos, adaptadores

Suportes para monitor e notebook

Extensões e filtros de linha

🪑 Mobiliário de escritório

Mesas e escrivaninhas

Cadeiras ergonômicas

Armários e arquivos metálicos

Estações de trabalho

Suportes de monitor e organizadores de mesa

☕ Copa e limpeza corporativa

Copos descartáveis, guardanapos, talheres

Cafés, açúcar, adoçante, chá

Produtos de limpeza (álcool, detergente, desinfetante)

Papel higiênico, papel toalha

Sacos de lixo

🧰 Equipamentos e utilidades

Calculadoras

Tesouras, estiletes e refis

Grampeadores e perfuradores

Quadros brancos e murais de avisos

Seladoras e balanças (para envios e embalagens)

🧍‍♂️ EPI e segurança (para empresas que misturam segmentos)

Máscaras, luvas, óculos de proteção

Protetores auriculares

Calçados de segurança

Aventais e uniformes

📦 Serviços e diferenciais B2B

Além dos produtos, um bom site B2B pode oferecer:

Pedidos recorrentes / assinatura de materiais

Cotações personalizadas por CNPJ

Descontos por volume

Entrega programada para escritórios

Faturamento para pagamento a prazo (boleto 30 dias)
*/