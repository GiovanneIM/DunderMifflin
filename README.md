<h1 align="center">📄 Dunder Mifflin Paper Company, Inc 📄</h1>

<p align="center">
  <b>Projeto Interdisciplinar</b><br>
  Envolvendo as disciplinas de <b>Backend</b> e <b>Frontend</b>.
</p>

---

## 🧾 Descrição do Projeto

O objetivo deste projeto é desenvolver um site para uma loja de comércio **B2B (Business to Business)** — ou seja, um sistema voltado para empresas que vendem produtos ou serviços a outras empresas.

O site conta com:

- Uma **API** no **BackEnd**, construída com a biblioteca **Express** do **Node.js**  
- Um **FrontEnd** desenvolvido com **Next.js**, responsável por consumir a API e exibir os produtos

> 💡 **Observação:** Todos os produtos exibidos no site devem ser obtidos por meio de requisições à API.

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Descrição |
|-------------|------------|
| **JavaScript** | Linguagem principal do projeto |
| **Node.js** | Ambiente de execução do BackEnd |
| **Express** | Framework para criação da API |
| **express-session** | Gerenciamento de sessões de usuário |
| **cors** | Controle de acesso entre domínios |
| **Next.js** | Framework React para o FrontEnd |
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
  
  # Instale as dependências do BackEnd
  npm install
  
  # Inicie o servidor Backend
  npm server.js
  
  # Em um novo terminal, acesse a pasta do projeto Next
  cd dundermifflin
  
  # Instale as dependências do FrontEnd
  npm install
  
  # Inicie o servidor FrontEnd
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

Listagem de produtos obtidos via API

Login e gerenciamento de sessão

Interface responsiva com Bootstrap

Comunicação entre BackEnd e FrontEnd via requisições HTTP

---

<p align="center">Feito por <b>Giovanne Isaac Marques</b></p>
