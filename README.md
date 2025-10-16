<p align="center">
  <img src="./logoPreta.svg" alt="Logo Dunder Mifflin" width="200"/>
</p>

<h1 align="center">📄 Dunder Mifflin Paper Company, Inc 📄</h1>

<p align="center">
  <b>Projeto Interdisciplinar</b><br>
  Envolvendo as disciplinas de <b>Backend</b> e <b>Frontend</b>.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-Express-green" alt="Node.js">
  <img src="https://img.shields.io/badge/Next.js-Frontend-blue" alt="Next.js">
  <img src="https://img.shields.io/badge/Bootstrap-Responsive-purple" alt="Bootstrap">
</p>

---

## 🧾 Descrição do Projeto

O objetivo deste projeto é desenvolver um site para uma loja de comércio **B2B (Business to Business)** — ou seja, um sistema voltado para empresas que vendem produtos ou serviços a outras empresas.

O site conta com:

- Uma **API** no **Backend**, construída com a biblioteca **Express** do **Node.js**  
- Um **Frontend** desenvolvido com **Next.js**, responsável por consumir a API e exibir os produtos

> 💡 **Observação:** Todos os produtos exibidos no site devem ser obtidos por meio de requisições à API.

---

## 💡 Ideia Realizada

<p align="center">
  <img src="./logoPreta.svg" alt="Logo Dunder Mifflin" width="120"/>
</p>

Decidi construir o sistema para uma empresa fictícia de venda de materiais de escritório chamada **Dunder Mifflin Paper Company, Inc**, inspirada na série *The Office*.

O sistema foi desenvolvido para gerenciar a relação entre **Administradores**, **Empresas Clientes** e **Gerentes de Compras**, permitindo o controle completo de produtos, listas de compras e aprovações.

### 👥 Tipos de Usuário

| Tipo | Função Principal |
|--------|------------------|
| **Administrador** | Gerencia empresas, produtos e listas de compras |
| **Empresa Cliente** | Controla seus gerentes e aprova listas de compras |
| **Gerente de Compras** | Cria e envia listas de compras para aprovação |

### 🧍‍♂️ Administradores
- Acessam o sistema através do endereço:  
  👉 `http://localhost:3000/admin`
- Realizam login e são direcionados para a página `/admin/home`.
- Possuem acesso a funcionalidades de:
  - Cadastro e gerenciamento de **empresas clientes**  
  - Controle de **produtos do estoque**  
  - Acompanhamento e aprovação de **listas de compras** enviadas pelas empresas

### 🏢 Empresas Clientes
- Acessam o site pelo endereço principal:  
  👉 `http://localhost:3000`
- Após clicar em **Login**, são direcionadas para `/login`.
- Após autenticação, podem:
  - Cadastrar e gerenciar seus **gerentes de compras**  
  - Visualizar e aprovar as **listas de compras** enviadas pelos gerentes vinculados à empresa

### 🛒 Gerentes de Compras
- Também acessam o sistema via `http://localhost:3000`
- Após login, podem:
  - **Adicionar produtos** à sua lista de compras  
  - **Finalizar e enviar** a lista para sua respectiva empresa  
  - **Aguardar aprovação** da empresa cliente

---

> 🧠 **Resumo:**  
> O sistema cria um fluxo completo de compras B2B, permitindo que administradores gerenciem o catálogo, empresas aprovem pedidos e gerentes façam requisições de produtos — tudo integrado em uma interface web.

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Descrição |
|-------------|------------|
| **JavaScript** | Linguagem principal do projeto |
| **Node.js** | Ambiente de execução do Backend |
| **Express** | Framework para criação da API |
| **express-session** | Gerenciamento de sessões de usuário |
| **cors** | Controle de acesso entre domínios |
| **Next.js** | Framework React para o Frontend |
| **Bootstrap** | Framework CSS para estilização responsiva |

---

## 🚀 Como Executar o Projeto

```bash
  # Clone o repositório
  git clone https://github.com/GiovanneIM/DunderMifflin.git
  
  # Entre na pasta do projeto
  cd DunderMifflin
  
  # Entre na pasta da API
  cd api
  
  # Instale as dependências do Backend
  npm install
  
  # Inicie o servidor Backend
  node server.js
  
  # Em um novo terminal, acesse a pasta do projeto Next
  cd ../dundermifflin
  
  # Instale as dependências do Frontend
  npm install
  
  # Inicie o servidor Frontend
  npm run dev
```
Acesse o projeto em: http://localhost:3000

---

## 📂 Estrutura do Projeto
```
DunderMifflin/
│
├── api/
│   ├── server.js
│   ├── routes/
│   ├── middlewares/
│   ├── json/
│   └── js/
│
└── dundermifflin/
    ├── pages/
    ├── components/
    └── styles/
```

---

## 📌 Funcionalidades

- Listagem de produtos obtidos via API  
- Login e gerenciamento de sessão  
- Interface responsiva com Bootstrap  
- Comunicação entre Backend e Frontend via requisições HTTP  

---

<p align="center">
  Feito por <b>Giovanne Isaac Marques</b><br>
  <sub>Inspirado na série <i>The Office</i> 🏢</sub>
</p>

Seu código está organizado de forma modular e bem estruturada, o que é ótimo. Vou revisar rapidamente o fluxo da aplicação e, em seguida, destacar os ajustes importantes e potenciais problemas, especialmente com relação à sessão, CORS, e integração com o front-end.

✅ Visão Geral do Fluxo

Arquivo sessao.js

Configura a sessão via express-session.

Verifica se há um usuário logado nas sessões com base em três tipos: gerente, empresa, admin.

Anexa o objeto do usuário na req.usuario.

Arquivo middleware.js

Configura o CORS com credentials: true (essencial para cookies).

Aplica o middleware de sessão (sessao.js) e um logger.

Habilita express.json() para aceitar JSON no corpo das requisições.

Arquivo server.js

Aplica todos os middlewares antes das rotas.

Define rotas para diferentes perfis (/admin, /empresa, /gerente, etc).

Inicia o servidor na porta 4000.

❗ Pontos de Atenção Críticos
1. Problemas comuns com express-session + CORS

Se seu front-end está em http://localhost:3000 e seu back-end em http://localhost:4000, você precisa garantir que os cookies de sessão estão sendo enviados corretamente.

✅ SOLUÇÃO:

Adicione essas configurações no express-session dentro do sessao.js:

cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 dia
    httpOnly: true,
    secure: false, // true em produção com HTTPS
    sameSite: 'lax' // ou 'none' se for HTTPS e domínios diferentes
}


🔒 Se estiver usando HTTPS e domínios diferentes, use:

secure: true,
sameSite: 'none'

2. Middleware de sessão deve ser aplicado apenas uma vez

Se por acaso você aplicar o middleware sessao.js duas vezes (como em middleware.js e diretamente em outro lugar), isso pode causar bugs ou comportamentos inesperados (sessão não persistente, por exemplo).

✅ Está tudo certo aqui, porque ele está sendo aplicado apenas uma vez em middlewares.js, que é usado em server.js.

3. Evite mutações diretas na sessão

Este trecho:

req.usuario = req.session[tipo];
req.usuario.tipo = tipo;


Modifica o objeto da sessão diretamente. Isso pode causar bugs se o mesmo objeto de sessão for usado em outro lugar.

✅ Melhor usar:

req.usuario = { ...req.session[tipo], tipo };

4. Seu front-end precisa usar credentials: 'include'

No fetch/Axios no front-end, você precisa garantir que os cookies sejam enviados com as requisições:

// Exemplo com fetch
fetch('http://localhost:4000/rota', {
  method: 'POST',
  credentials: 'include', // ESSENCIAL
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ ...dados })
});

✅ Checklist final
Item	OK?	Observações
CORS com credentials: true	✅	Está correto
Cookie de sessão com secure, sameSite, httpOnly	⚠️	Adicionar no sessao.js
Sessão aplicada uma vez	✅	OK
req.usuario seguro	⚠️	Usar spread { ...obj }
credentials: 'include' no front-end	❓	Verifique no React/Vue/etc
Requisições em JSON	✅	express.json() está ativado
Se ainda estiver com problema de sessão não persistir, verifique:

O front-end está usando credentials: 'include'?

Está testando com navegador habilitado para cookies de terceiros?

Está em localhost ou já com HTTPS (isso muda sameSite e secure)?

Se quiser, posso revisar um trecho do código do front-end também (React, por exemplo) para garantir que a sessão esteja funcionando corretamente. Só mandar.
