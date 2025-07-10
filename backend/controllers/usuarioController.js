import Usuario from '../models/Usuario.js';
import jwt from 'jsonwebtoken';

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
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: error.message
      });
    }
  }

  static async criar(req, res) {
    try {
      const { nome, email, senha, idade, ocupacao, endereco, descricao, foto } = req.body;
      
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
        idade,
        ocupacao,
        endereco,
        descricao,
        foto
      });

      res.status(201).json({
        success: true,
        message: 'Usuário criado com sucesso',
        data: {
          id: novoUsuario.id,
          nome: novoUsuario.nome,
          email: novoUsuario.email,
          idade: novoUsuario.idade,
          ocupacao: novoUsuario.ocupacao,
          endereco: novoUsuario.endereco,
          descricao: novoUsuario.descricao,
          foto: novoUsuario.foto
        }
      });
    } catch (error) {
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
      const { nome, email, idade, ocupacao, endereco, descricao, foto } = req.body;
      
      if (!nome || !email) {
        return res.status(400).json({
          success: false,
          message: 'Nome e email são obrigatórios'
        });
      }

      const usuarioAtualizado = await Usuario.atualizar(id, {
        nome,
        email,
        idade,
        ocupacao,
        endereco,
        descricao,
        foto
      });

      res.status(200).json({
        success: true,
        message: 'Usuário atualizado com sucesso',
        data: usuarioAtualizado
      });
    } catch (error) {
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

  static async uploadFoto(req, res) {
    try {
      const { id } = req.params;
      
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'Nenhuma imagem foi enviada'
        });
      }

      const fotoPath = `/uploads/${req.file.filename}`;
      
      const usuarioAtualizado = await Usuario.atualizar(id, {
        foto: fotoPath
      });

      res.status(200).json({
        success: true,
        message: 'Foto de perfil atualizada com sucesso',
        data: {
          ...usuarioAtualizado,
          foto: fotoPath
        }
      });
    } catch (error) {
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

  static async login(req, res) {
    try {
      const { email, senha } = req.body;
      
      if (!email || !senha) {
        return res.status(400).json({
          success: false,
          message: 'Email e senha são obrigatórios'
        });
      }

      const usuario = await Usuario.autenticar(email, senha);
      
      if (!usuario) {
        return res.status(401).json({
          success: false,
          message: 'Email ou senha inválidos'
        });
      }

      const token = jwt.sign(
        { 
          id: usuario.id, 
          email: usuario.email 
        },
        process.env.JWT_SECRET || '1234',
        { expiresIn: '24h' }
      );

      res.status(200).json({
        success: true,
        message: 'Login realizado com sucesso',
        data: {
          usuario,
          token
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: error.message
      });
    }
  }
}

export default UsuarioController; 