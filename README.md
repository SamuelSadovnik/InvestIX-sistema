<div align="center">
  <h1>InvestIX - Sistema de Gerenciamento de Carteira de Imóveis</h1>
  <p>Uma plataforma para cadastrar, gerenciar e acompanhar a rentabilidade de seus imóveis de forma centralizada.</p>
  
  <img src="https://img.shields.io/github/repo-size/SamuelSadovnik/InvestIX-sistema" alt="Tamanho do Repositório">
  <img src="https://img.shields.io/github/last-commit/SamuelSadovnik/InvestIX-sistema" alt="Último Commit">
  <img src="https://img.shields.io/badge/licen%C3%A7a-MIT-blue" alt="Licença">
</div>

<br>

---

### 📖 Índice

* [Sobre o Projeto](#-sobre-o-projeto)
* [✨ Funcionalidades](#-funcionalidades)
* [🛠️ Tecnologias Utilizadas](#️-tecnologias-utilizadas)
* [🚀 Começando](#-começando)
* [📄 Licença](#-licença)
* [✉️ Contato](#️-contato)

---

### 💻 Sobre o Projeto

O **InvestIX** foi desenvolvido como uma solução completa para proprietários e investidores do setor imobiliário que desejam ter um controle claro de sua carteira de imóveis. A plataforma permite o cadastro de propriedades (casas, apartamentos, terrenos), o acompanhamento de receitas de aluguel, despesas de manutenção e a visualização da valorização dos bens ao longo do tempo.

---

### ✨ Funcionalidades

* 🔐 **Autenticação de Usuários:** Sistema seguro de Login e Cadastro.
* 📊 **Dashboard Interativo:** Gráficos que exibem a distribuição dos imóveis por tipo, a receita total de aluguéis e o balanço de despesas.
* 🏠 **Cadastro de Imóveis:** Adicione novas propriedades à sua carteira com detalhes como endereço, valor de compra, área e tipo.
* 🗑️ **Gerenciamento de Imóveis:** Edite informações ou remova propriedades que foram vendidas.
* 💸 **Controle Financeiro:** Registre receitas de aluguel e despesas com IPTU, condomínio, reformas e manutenções para cada imóvel.
* 📈 **Histórico e Rentabilidade:** Visualize o fluxo de caixa por propriedade e acompanhe a rentabilidade da sua carteira imobiliária.

---

### 🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando tecnologias modernas e populares no ecossistema JavaScript/Node.js.

| Frontend | Backend | Banco de Dados |
| :--- | :--- | :--- |
| React | Node.js | MySQL |
| Vite | Express | |
| Styled Components| Cors | |
| Axios | Nodemon | |
| Recharts | | |

---

### 🚀 Começando

A maneira mais simples e recomendada de executar este projeto é com o Docker.

#### 🐳 Rodando com Docker (Método Recomendado)

**Pré-requisitos:**
* [Docker](https://www.docker.com/products/docker-desktop/) instalado e em execução na sua máquina.

**Passos:**
1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/SamuelSadovnik/InvestIX-sistema.git](https://github.com/SamuelSadovnik/InvestIX-sistema.git)
    cd InvestIX-sistema
    ```

2.  **Crie os arquivos Docker:**
    * Certifique-se de que os arquivos `docker-compose.yml` (na raiz), `frontend/Dockerfile` e `backend/Dockerfile` existem no projeto.

3.  **Inicie a Aplicação:**
    * No terminal, na raiz do projeto, execute o comando:
    ```bash
    docker-compose up --build
    ```
    * Após iniciar, conecte-se ao banco de dados (Host: `localhost`, Porta: `3306`, User: `root`, Pass: `rootpassword`) e execute o script de `backend/src/database/script.sql` para criar as tabelas.

4.  **Acesse a aplicação:**
    * **Frontend:** [http://localhost:5173](http://localhost:5173)
    * **Backend (API):** [http://localhost:8800](http://localhost:8800)

<br>

<details>
  <summary>🔩 Ver Instruções para Instalação Manual (Alternativa)</summary>
  
  #### Pré-requisitos
  Você vai precisar ter as seguintes ferramentas instaladas na sua máquina:
  * [Git](https://git-scm.com)
  * [Node.js](https://nodejs.org/en/) (versão 16 ou superior)
  * [NPM](https://www.npmjs.com/)
  * Um gerenciador de banco de dados, como o [MySQL Workbench](https://dev.mysql.com/downloads/workbench/).

  #### Instalação
  1.  **Clone o repositório:**
      ```bash
      git clone [https://github.com/SamuelSadovnik/InvestIX-sistema.git](https://github.com/SamuelSadovnik/InvestIX-sistema.git)
      cd InvestIX-sistema
      ```
  2.  **Instale as dependências do Backend:**
      ```bash
      cd backend
      npm install
      ```
  3.  **Instale as dependências do Frontend:**
      ```bash
      cd ../frontend
      npm install
      ```
  4.  **Configure o Banco de Dados:**
      * Crie um novo schema (banco de dados) com o nome que preferir (ex: `investix_db`).
      * Execute o script SQL que está em `backend/src/database/script.sql` para criar as tabelas.
  5.  **Configure as Variáveis de Ambiente do Backend:**
      * Na pasta `backend`, crie um arquivo chamado `.env` com as suas credenciais do MySQL.
  6.  **Execute a Aplicação:**
      * Inicie o Backend (na pasta `backend`): `npm run dev`
      * Inicie o Frontend (na pasta `frontend`): `npm run dev`
</details>

---

### 📄 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

---

### ✉️ Contato

**Samuel Sadovnik**

* GitHub: [SamuelSadovnik](https://github.com/SamuelSadovnik)
* LinkedIn: [https://www.linkedin.com/in/samuel-malaquias-sadovnik-13b65231b/](https://www.linkedin.com/in/samuel-malaquias-sadovnik-13b65231b/)
* Email: `[seu_email@dominio.com]`

<p align="center">Feito com ❤️ por Samuel Sadovnik</p>
