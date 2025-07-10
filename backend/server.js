import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import usuarioRoutes from './routes/usuarioRoutes.js';
import { testConnection, createTables } from './config/database.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

//Middlewares necessários
app.use(cors({
  origin: 'https://sync-with-u.vercel.app', 
  credentials: true 
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('public/uploads'));


app.get('/', (req, res) => {
  res.json({
    message: 'Funcionando',
    endpoints: {
      'GET /usuario': 'Listar todos os usuários',
      'GET /usuario/:id': 'Buscar usuário por ID',
      'POST /usuario': 'Criar novo usuário',
      'PUT /usuario/:id': 'Atualizar usuário',
      'DELETE /usuario/:id': 'Deletar usuário',
      'POST /usuario/:id/foto': 'Upload de foto de perfil'
    }
  });
});

app.use('/api', usuarioRoutes);
app.use((err, req, res, next) => {
  console.error('Erro não tratado:', err);
  res.status(500).json({
    success: false,
    message: 'Erro interno do servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Erro interno'
  });
});

app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Rota não encontrada'
  });
});

const startServer = async () => {
  try {
    const isConnected = await testConnection();
    if (!isConnected) {
      console.error('não foi possível conectar ao banco de dados');
      process.exit(1);
    }

    await createTables();

    app.listen(PORT, () => {
      console.log(`servidor rodando na porta ${PORT}`);
      console.log(`API disponível em: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao inicializar servidor:', error);
    process.exit(1);
  }
};

startServer(); 