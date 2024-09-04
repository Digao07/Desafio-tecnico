# Gerenciador de Tarefas

Esta aplicação web permite que os usuários gerenciem suas tarefas diárias de forma simples e eficiente. O usuário pode cadastrar, editar, marcar como concluídas e excluir tarefas. A aplicação também oferece funcionalidades de autenticação, permitindo que os usuários criem contas, façam login e gerenciem suas tarefas pessoais.

## Funcionalidades

- Cadastro de novos usuários
- Login e logout de usuários
- Criação, leitura, atualização e exclusão de tarefas (CRUD)
- Marcar tarefas como concluídas
- Interface intuitiva e responsiva

## Tecnologias Utilizadas

### Frontend
- **React**: Biblioteca JavaScript para construção da interface de usuário.
- **Chakra UI**: Biblioteca de componentes para React, utilizada para criar a interface de forma rápida e estilizada.
- **Axios**: Cliente HTTP para realizar requisições ao backend.
- **React Router**: Biblioteca para gerenciar as rotas e navegação na aplicação.
- **Context API**: Utilizada para gerenciar o estado de autenticação.

### Backend
- **Node.js**: Ambiente de execução para JavaScript no servidor.
- **Express**: Framework web para Node.js, utilizado para construir a API RESTful.
- **Sequelize**: ORM para Node.js, utilizado para interagir com o banco de dados MySQL.
- **MySQL**: Sistema de gerenciamento de banco de dados relacional.
- **JWT (JSON Web Token)**: Utilizado para autenticação e autorização de usuários.
- **bcrypt**: Biblioteca para hash de senhas, garantindo a segurança das credenciais dos usuários.

## Instalação e Execução

### Pré-requisitos

- Node.js e npm instalados
- MySQL instalado e configurado

### Configuração do Backend

1. Clone o repositório do backend:
    ```bash
    git clone https://github.com/seu-usuario/task-manager-backend.git
    cd task-manager-backend
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```

3. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis (ajuste conforme necessário):
    ```env
    DB_HOST=localhost
    DB_USER=seu-usuario
    DB_PASSWORD=sua-senha
    DB_NAME=task_manager
    JWT_SECRET=sua_chave_secreta
    ```

4. Rode as migrações para criar as tabelas no banco de dados:
    ```bash
    npx sequelize-cli db:migrate
    ```

5. Inicie o servidor:
    ```bash
    npm start
    ```
    O backend estará disponível em `http://localhost:3000`.

### Configuração do Frontend

1. Clone o repositório do frontend:
    ```bash
    git clone https://github.com/seu-usuario/task-manager-frontend.git
    cd task-manager-frontend
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```

3. Inicie o servidor de desenvolvimento:
    ```bash
    npm start
    ```
    O frontend estará disponível em `http://localhost:3001`.

## Como Usar a Aplicação

1. Acesse `http://localhost:3001` em seu navegador.
2. Registre-se ou faça login com uma conta existente.
3. Após o login, você será redirecionado para a página de gerenciamento de tarefas.
4. Adicione, edite, marque como concluídas ou exclua suas tarefas conforme necessário.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e enviar pull requests.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
