
# Gerenciador Financeiro API

## Descrição

Este é um projeto de API para gerenciamento financeiro pessoal e de grupos, desenvolvido em **TypeScript** utilizando **Node.js**. A API permite registrar receitas, despesas, metas financeiras e fornecer relatórios simples de entradas e saídas com sugestões geradas pela IA da OpenAI.

## Funcionalidades

1. **Gerenciamento de Usuários**
   - Criação de usuários.
   - Consulta de informações de usuários.

2. **Gerenciamento de Finanças**
   - Registro de receitas e despesas.
   - Análise de dados financeiros.
   - Sugestões para economia de dinheiro baseadas em IA.

3. **Gerenciamento de Metas**
   - Criação de metas financeiras.
   - Atualização do progresso das metas.
   - Consulta de metas financeiras.

4. **Relatórios Financeiros**
   - Relatório de entradas, saídas e saldo em um período definido.

5. **Sugestões Inteligentes**
   - Geração de recomendações financeiras usando a OpenAI.

## Tecnologias Utilizadas

- **Node.js**
- **TypeScript**
- **Express**
- **Prisma** (ORM)
- **SQLite** (Banco de Dados)
- **OpenAI API**
- **Zod** (Validação de Dados)
- **Nodemailer** (para notificações, se configurado)

## Estrutura do Projeto

```plaintext
finance-api/
├── src/
│   ├── index.ts
│   ├── routes/
│   │   ├── finance.ts
│   │   └── user.ts
│   ├── controllers/
│   │   ├── financeController.ts
│   │   └── userController.ts
│   ├── services/
│   │   └── openaiService.ts
│   ├── middlewares/
│   │   ├── errorHandler.ts
│   │   └── logger.ts
│   ├── prisma/
│   │   └── schema.prisma
│   └── utils/
│       └── validators.ts
├── .env
├── tsconfig.json
├── package.json
├── README.md
```

## Configuração

### Pré-requisitos
- Node.js (v16 ou superior)
- npm ou yarn
- OpenAI API Key

### Passos para Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/finance-api.git
   cd finance-api
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:
   ```env
   OPENAI_API_KEY=sua_chave_openai
   DATABASE_URL=file:./dev.db
   ```

4. Configure o Prisma:
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

5. Inicie o servidor:
   ```bash
   npm run dev
   ```

   O servidor estará disponível em `http://localhost:3000`.

## Endpoints

### Usuários

- **POST /api/user/create**
  - **Descrição**: Cria um novo usuário.
  - **Body Exemplo**:
    ```json
    {
      "name": "John Doe",
      "email": "john.doe@example.com"
    }
    ```

- **GET /api/user/:userId**
  - **Descrição**: Consulta informações de um usuário.
  - **Exemplo de Requisição**:
    ```
    GET /api/user/1
    ```

---

### Finanças

- **POST /api/finance/track**
  - **Descrição**: Registra uma receita ou despesa.
  - **Body Exemplo**:
    ```json
    {
      "userId": 1,
      "type": "expense",
      "amount": 100,
      "category": "Food"
    }
    ```

- **GET /api/finance/suggestions/:userId**
  - **Descrição**: Obtém sugestões financeiras.
  - **Exemplo de Requisição**:
    ```
    GET /api/finance/suggestions/1
    ```

- **GET /api/finance/goals/:userId**
  - **Descrição**: Lista metas financeiras.
  - **Exemplo de Requisição**:
    ```
    GET /api/finance/goals/1
    ```

- **POST /api/finance/goals**
  - **Descrição**: Cria uma nova meta financeira.
  - **Body Exemplo**:
    ```json
    {
      "userId": 1,
      "title": "Economizar para viagem",
      "target": 5000
    }
    ```

- **PUT /api/finance/goals/:goalId**
  - **Descrição**: Atualiza o progresso de uma meta.
  - **Body Exemplo**:
    ```json
    {
      "progress": 1000
    }
    ```

- **GET /api/finance/report/:userId**
  - **Descrição**: Gera um relatório de entradas, saídas e saldo em um período.
  - **Query Parameters**:
    - `startDate`: Data inicial no formato `YYYY-MM-DD`.
    - `endDate`: Data final no formato `YYYY-MM-DD`.
  - **Exemplo de Requisição**:
    ```
    GET /api/finance/report/1?startDate=2023-01-01&endDate=2023-01-31
    ```

---