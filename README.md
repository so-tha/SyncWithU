# 🚀 API SyncWithU - Backend

Esta é a API backend para o projeto SyncWithU, desenvolvida em Node.js com Express e MySQL.

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- MySQL (versão 8.0 ou superior)
- npm ou yarn

## 🛠️ Configuração

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar banco de dados MySQL

1. **Instalar MySQL** (se ainda não tiver):
   ```bash
   # Ubuntu/Debian
   sudo apt install mysql-server
   
   # Arch Linux
   sudo pacman -S mysql
   ```

2. **Iniciar MySQL**:
   ```bash
   sudo systemctl start mysqld
   sudo systemctl enable mysqld
   ```

3. **Configurar MySQL**:
   ```bash
   sudo mysql_secure_installation
   ```

4. **Criar banco de dados**:
   ```sql
   mysql -u root -p
   CREATE DATABASE syncwithu_db;
   ```

### 3. Configurar variáveis de ambiente

1. Copie o arquivo de exemplo:
   ```bash
   cp backend/env.example backend/.env
   ```

2. Edite o arquivo `backend/.env` com suas configurações:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=sua_senha_aqui
   DB_NAME=syncwithu_db
   DB_PORT=3306
   PORT=3001
   NODE_ENV=development
   ```

## 🚀 Como executar

### Desenvolvimento
```bash
npm run api:dev
```

### Produção
```bash
npm run api
```

A API estará disponível em: `http://localhost:3001`

## 📚 Endpoints da API

### Base URL: `http://localhost:3001/api`

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/usuario` | Listar todos os usuários |
| GET | `/usuario/:id` | Buscar usuário por ID |
| POST | `/usuario` | Criar novo usuário |
| PUT | `/usuario/:id` | Atualizar usuário |
| DELETE | `/usuario/:id` | Deletar usuário |

## 📝 Exemplos de uso

### 1. Criar usuário (POST /usuario)
```bash
curl -X POST http://localhost:3001/api/usuario \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "joao@email.com",
    "senha": "123456",
    "telefone": "(11) 99999-9999",
    "data_nascimento": "1990-01-01"
  }'
```

### 2. Listar todos os usuários (GET /usuario)
```bash
curl http://localhost:3001/api/usuario
```

### 3. Buscar usuário por ID (GET /usuario/:id)
```bash
curl http://localhost:3001/api/usuario/1
```

### 4. Atualizar usuário (PUT /usuario/:id)
```bash
curl -X PUT http://localhost:3001/api/usuario/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva Atualizado",
    "email": "joao.novo@email.com",
    "telefone": "(11) 88888-8888",
    "data_nascimento": "1990-01-01"
  }'
```

### 5. Deletar usuário (DELETE /usuario/:id)
```bash
curl -X DELETE http://localhost:3001/api/usuario/1
```

## 🏗️ Estrutura do projeto

```
backend/
├── config/
│   └── database.js      # Configuração do banco de dados
├── controllers/
│   └── usuarioController.js  # Lógica de negócio
├── models/
│   └── Usuario.js       # Modelo de dados
├── routes/
│   └── usuarioRoutes.js # Definição das rotas
├── server.js            # Servidor principal
├── .env                 # Variáveis de ambiente
└── README.md           # Esta documentação
```

## 🔧 Tecnologias utilizadas

- **Node.js**: Runtime JavaScript
- **Express**: Framework web
- **MySQL2**: Driver MySQL para Node.js
- **CORS**: Middleware para Cross-Origin Resource Sharing
- **dotenv**: Gerenciamento de variáveis de ambiente

## 📊 Estrutura do banco de dados

### Tabela: `usuarios`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | INT | Chave primária (auto incremento) |
| nome | VARCHAR(100) | Nome do usuário |
| email | VARCHAR(100) | Email único do usuário |
| senha | VARCHAR(255) | Senha do usuário |
| telefone | VARCHAR(20) | Telefone (opcional) |
| data_nascimento | DATE | Data de nascimento (opcional) |
| created_at | TIMESTAMP | Data de criação |
| updated_at | TIMESTAMP | Data de atualização |

## 🚨 Observações importantes

1. **Segurança**: Em produção, sempre criptografe as senhas usando bcrypt ou similar
2. **Validação**: Implemente validação mais robusta dos dados de entrada
3. **Autenticação**: Adicione sistema de autenticação (JWT, sessions, etc.)
4. **Logs**: Implemente sistema de logs para monitoramento
5. **Testes**: Adicione testes unitários e de integração

## 🐛 Solução de problemas

### Erro de conexão com MySQL
- Verifique se o MySQL está rodando
- Confirme as credenciais no arquivo `.env`
- Teste a conexão: `mysql -u root -p`

### Erro de porta em uso
- Mude a porta no arquivo `.env`
- Ou mate o processo que está usando a porta: `lsof -ti:3001 | xargs kill -9`

### Erro de módulo não encontrado
- Execute `npm install` novamente
- Verifique se todas as dependências estão instaladas 