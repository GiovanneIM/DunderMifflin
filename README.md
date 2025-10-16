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

Decidi construir o sistema para uma empresa fictícia de venda de materiais de escritório chamada **Dunder Mifflin Paper Company, Inc**, inspirada na série *The Office*.

O sistema foi desenvolvido para gerenciar a relação entre **Administradores**, **Empresas Clientes** e **Gerentes de Compras**, permitindo o controle completo de produtos, listas de compras e aprovações.

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

### 👥 Tipos de Usuário

| Tipos | Função Principal |
|--------|------------------|
| **Administrador** | Gerencia empresas, produtos e listas de compras |
| **Empresa Cliente** | Controla seus gerentes e aprova listas de compras |
| **Gerente de Compras** | Cria e envia listas de compras para aprovação |

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

<p align="center">Feito por <b>Giovanne Isaac Marques</b></p>
