const axios = require('axios');
const chalk = require('chalk');

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  timeout: 5000,
});

async function testEndpoints() {
  try {
    // 1. Listar todos os usuários
    const usuarios = await api.get('/usuario');
    console.log(chalk.blue('\nGET /usuario'));
    console.log(usuarios.data);

    // 2. Buscar usuário por ID (exemplo: 1)
    const usuarioId = 1;
    const usuario = await api.get(`/usuario/${usuarioId}`);
    console.log(chalk.blue(`\nGET /usuario/${usuarioId}`));
    console.log(usuario.data);

    // 3. Login (exemplo)
    const login = await api.post('/login', {
      email: 'seuemail@exemplo.com',
      senha: 'suasenha'
    });
    console.log(chalk.blue('\nPOST /login'));
    console.log(login.data);

    // 4. Criar novo usuário (exemplo)
    const novoUsuario = await api.post('/usuario', {
      nome: 'Novo Usuário',
      email: 'novo@exemplo.com',
      senha: '1234'
    });
    console.log(chalk.blue('\nPOST /usuario'));
    console.log(novoUsuario.data);

    // 5. Atualizar usuário (exemplo)
    const usuarioAtualizado = await api.put(`/usuario/${usuarioId}`, {
      nome: 'Novo Usuário',
      email: 'novo@exemplo.com',
      senha: '1234'
    });
    console.log(chalk.blue(`\nPUT /usuario/${usuarioId}`));
    console.log(usuarioAtualizado.data);

    // 6. Deletar usuário (exemplo)
    const usuarioDeletado = await api.delete(`/usuario/${usuarioId}`);
    console.log(chalk.blue(`\nDELETE /usuario/${usuarioId}`));
    console.log(usuarioDeletado.data);

    // 7. Buscar usuário por email (exemplo)
    const usuarioPorEmail = await api.get('/usuario/email', {
      params: {
        email: 'novo@exemplo.com'
      }
    });
    console.log(chalk.blue(`\nGET /usuario/email`));

    // 8. Buscar usuário por ID (exemplo)
    const usuarioPorId = await api.get(`/usuario/${usuarioId}`);
    console.log(chalk.blue(`\nGET /usuario/${usuarioId}`));
    console.log(usuarioPorId.data);
   

  } catch (error) {
    if (error.response) {
      console.log(chalk.red('\nErro na requisição:'));
      console.log('Status:', error.response.status);
      console.log('Data:', error.response.data);
    } else {
      console.log(chalk.red('\nErro:'), error.message);
    }
  }
}

testEndpoints();