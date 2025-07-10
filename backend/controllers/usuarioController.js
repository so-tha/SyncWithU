import Usuario from '../models/Usuario.js';

class UsuarioController {
  static async listarTodos(req, res) {
    try {
      const usuarios = await Usuario.listarTodos();
      res.status(200).json({
        success: true,
        message: 'Usuários listados com sucesso',
        data: usuarios
      });
    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: error.message
      });
    }
  }

  static async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const usuario = await Usuario.buscarPorId(id);
      
      if (!usuario) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
      }
      
      res.status(200).json({
        success: true,
        message: 'Usuário encontrado com sucesso',
        data: usuario
      });
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: error.message
      });
    }
  }

  static async criar(req, res) {
    try {
      const { nome, email, senha, telefone, idade } = req.body;
      
      if (!nome || !email || !senha) {
        return res.status(400).json({
          success: false,
          message: 'Nome, email e senha são obrigatórios'
        });
      }

      const usuarioExistente = await Usuario.buscarPorEmail(email);
      if (usuarioExistente) {
        return res.status(400).json({
          success: false,
          message: 'Email já cadastrado'
        });
      }

      const novoUsuario = await Usuario.criar({
        nome,
        email,
        senha,
        telefone,
        idade
      });

      res.status(201).json({
        success: true,
        message: 'Usuário criado com sucesso',
        data: {
          id: novoUsuario.id,
          nome: novoUsuario.nome,
          email: novoUsuario.email,
          telefone: novoUsuario.telefone,
          idade: novoUsuario.idade
        }
      });
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: error.message
      });
    }
  }

  static async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome, email, telefone, idade } = req.body;
      
      if (!nome || !email) {
        return res.status(400).json({
          success: false,
          message: 'Nome e email são obrigatórios'
        });
      }

      const usuarioAtualizado = await Usuario.atualizar(id, {
        nome,
        email,
        telefone,
        idade
      });

      res.status(200).json({
        success: true,
        message: 'Usuário atualizado com sucesso',
        data: usuarioAtualizado
      });
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      
      if (error.message === 'Usuário não encontrado') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }
      
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: error.message
      });
    }
  }

  static async deletar(req, res) {
    try {
      const { id } = req.params;
      const resultado = await Usuario.deletar(id);
      
      res.status(200).json({
        success: true,
        message: resultado.message
      });
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      
      if (error.message === 'Usuário não encontrado') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }
      
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: error.message
      });
    }
  }
}

export default UsuarioController; 