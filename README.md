# SyncWithU

Sistema completo de gerenciamento de usuários com frontend em React/Vite e backend em Node.js/Express, com banco de dados MySQL.

## 🌐 Links de Acesso

- **Frontend (Vercel)**: [https://syncwithu.vercel.app](https://syncwithu.vercel.app)
- **Backend (Render)**: [https://syncwithu-backend.onrender.com](https://syncwithu-backend.onrender.com)
- **API Base URL**: `https://syncwithu-backend.onrender.com/api`

## 🚀 Deploy e Hospedagem

### Frontend
- **Plataforma**: Vercel
- **URL**: https://syncwithu.vercel.app
- **Arquivo de configuração**: `vercel.json`

### Backend
- **Plataforma**: Render
- **URL**: https://syncwithu-backend.onrender.com
- **Runtime**: Node.js

### Banco de Dados
- **Plataforma**: Railway
- **Tipo**: MySQL
- **Host**: yamanote.proxy.rlwy.net
- **Porta**: 54429
- **SSL**: Habilitado

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 19.1.0**: 
- **Vite 7.0.0**: 
- **React Router DOM 7.6.3**: 
- **Axios 1.10.0**: 
- **ESLint**: 

### Backend
- **Node.js**: 
- **Express 4.21.2**: 
- **MySQL2 3.14.1**: 
- **CORS 2.8.5**: 
- **dotenv 17.1.0**: 
- **bcryptjs 3.0.2**: 
- **jsonwebtoken 9.0.2**: 
- **multer 2.0.1**: 
- **TypeORM 0.3.25**: 
- **reflect-metadata 0.2.2**: 

### Ferramentas de Desenvolvimento
- **Nodemon 3.1.10**:
- **Chalk 4.1.2**: 
- **ESLint**: 

## 📁 Estrutura do Projeto

```
SyncWithU/
├── src/                    
│   ├── components/         
│   ├── pages/            
│   ├── services/          
│   └── App.jsx           
├── backend/               
│   ├── config/          
│   ├── controllers/      
│   ├── middleware/      
│   ├── models/         
│   ├── routes/         
│   └── server.js        
├── public/              
├── package.json        
├── vite.config.js      
├── vercel.json         
└── README.md          
```

## 🚀 Como Executar Localmente

### Pré-requisitos
- Node.js (versão 16 ou superior)
- MySQL (versão 8.0 ou superior)
- npm ou yarn

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar banco de dados MySQL

1. **Instalar MySQL**:
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

2. Edite o arquivo `backend/.env`:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=sua_senha_aqui
   DB_NAME=syncwithu_db
   DB_PORT=3306
   PORT=3001
   NODE_ENV=development
   ```

### 4. Executar o projeto

**Desenvolvimento**:
```bash
# Terminal 1 - Backend
npm run api:dev

# Terminal 2 - Frontend
npm run dev
```

**Produção**:
```bash
# Backend
npm run api

# Frontend
npm run build
npm run preview
```

## 📚 Endpoints da API

### Base URL: `https://syncwithu-backend.onrender.com/api`

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/usuario` | Listar todos os usuários |
| GET | `/usuario/:id` | Buscar usuário por ID |
| POST | `/usuario` | Criar novo usuário |
| PUT | `/usuario/:id` | Atualizar usuário |
| DELETE | `/usuario/:id` | Deletar usuário |

## 📝 Exemplos de uso da API

### 1. Criar usuário (POST /usuario)
```bash
curl -X POST https://syncwithu-backend.onrender.com/api/usuario \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "joao@email.com",
    "senha": "123456",
    "data_nascimento": "1990-01-01",
    "rua": "Rua das Flores",
    "bairro": "Centro",
    "estado": "SP"
  }'
```

### 2. Listar todos os usuários (GET /usuario)
```bash
curl https://syncwithu-backend.onrender.com/api/usuario
```

### 3. Buscar usuário por ID (GET /usuario/:id)
```bash
curl https://syncwithu-backend.onrender.com/api/usuario/1
```

### 4. Atualizar usuário (PUT /usuario/:id)
```bash
curl -X PUT https://syncwithu-backend.onrender.com/api/usuario/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva Atualizado",
    "email": "joao.novo@email.com",
    "telefone": "(11) 88888-8888",
    "data_nascimento": "1990-01-01",
    "rua": "Nova Rua",
    "bairro": "Novo Bairro",
    "estado": "RJ"
  }'
```

### 5. Deletar usuário (DELETE /usuario/:id)
```bash
curl -X DELETE https://syncwithu-backend.onrender.com/api/usuario/1
```

## 📊 Estrutura do Banco de Dados

### Tabela: `usuarios`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | INT | Chave primária (auto incremento) |
| nome | VARCHAR(100) | Nome do usuário |
| email | VARCHAR(100) | Email único do usuário |
| senha | VARCHAR(255) | Senha do usuário (hash) |
| telefone | VARCHAR(20) | Telefone do usuário |
| data_nascimento | DATE | Data de nascimento (opcional) |
| rua | VARCHAR(255) | Endereço - Rua |
| bairro | VARCHAR(255) | Endereço - Bairro |
| estado | VARCHAR(255) | Endereço - Estado |
| foto | VARCHAR(255) | Caminho da foto de perfil |
| created_at | TIMESTAMP | Data de criação |
| updated_at | TIMESTAMP | Data de atualização |

