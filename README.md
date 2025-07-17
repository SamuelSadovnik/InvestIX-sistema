<div align="center">
  <h1>InvestIX - Sistema de Gerenciamento de Investimentos</h1>
  <p>Uma plataforma full-stack para cadastrar e acompanhar a rentabilidade da sua carteira de investimentos de forma simples e visual.</p>
  
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

O **InvestIX** foi desenvolvido como uma solução completa para investidores que desejam ter um controle claro e centralizado de seus ativos financeiros. A plataforma permite o cadastro de diferentes tipos de investimentos, como Ações e Fundos Imobiliários (FIIs), e oferece um dashboard intuitivo com gráficos para visualizar a evolução e a composição da carteira.

---

### ✨ Funcionalidades

* 🔐 **Autenticação de Usuários:** Sistema seguro de Login e Cadastro.
* 📊 **Dashboard Interativo:** Gráficos (pizza e linha) que exibem a distribuição dos ativos e a rentabilidade ao longo do tempo.
* ➕ **Cadastro de Ativos:** Adicione novos investimentos à sua carteira de forma simples.
* 🗑️ **Remoção de Ativos:** Gerencie seus ativos, removendo os que não fazem mais parte da sua estratégia.
* 📈 **Histórico de Transações:** Visualize todas as operações de compra e venda realizadas.
* 🔄 **Responsividade (parcial/total):** A interface se adapta a diferentes tamanhos de tela. ---

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
