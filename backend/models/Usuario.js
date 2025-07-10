import pool from '../config/database.js';
import bcrypt from 'bcryptjs';

class Usuario {
  static async listarTodos() {
    try {
      const [rows] = await pool.execute('SELECT id, nome, email, idade, ocupacao, rua, bairro, estado, descricao, foto, created_at FROM usuarios');
      return rows;
    } catch (error) {
      throw new Error(`Erro ao listar usuários: ${error.message}`);
    }
  }

  static async buscarPorId(id) {
    try {
      const [rows] = await pool.execute(
        'SELECT id, nome, email, idade, ocupacao, rua, bairro, estado, descricao, foto, created_at FROM usuarios WHERE id = ?',
        [id]
      );
      return rows[0];
    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${error.message}`);
    }
  }

  static async buscarPorEmail(email) {
    try {
      const [rows] = await pool.execute(
        'SELECT id, nome, email, senha, idade, ocupacao, rua, bairro, estado, descricao, foto, created_at FROM usuarios WHERE email = ?',
        [email]
      );
      return rows[0];
    } catch (error) {
      throw new Error(`Erro ao buscar usuário por email: ${error.message}`);
    }
  }

  static async criar(dadosUsuario) {
    try {
      const { nome, email, senha, idade, ocupacao, rua, bairro, estado, descricao, foto } = dadosUsuario;
      const saltRounds = 10;
      const senhaHash = await bcrypt.hash(senha, saltRounds);
      
      // Tratar campos vazios
      const idadeProcessada = idade && idade !== '' ? parseInt(idade) : null;
      const ocupacaoProcessada = ocupacao && ocupacao !== '' ? ocupacao : null;
      const ruaProcessada = rua && rua !== '' ? rua : null;
      const bairroProcessado = bairro && bairro !== '' ? bairro : null;
      const estadoProcessado = estado && estado !== '' ? estado : null;
      const descricaoProcessada = descricao && descricao !== '' ? descricao : null;
      const fotoProcessada = foto && foto !== '' ? foto : null;
      
      const [result] = await pool.execute(
        'INSERT INTO usuarios (nome, email, senha, idade, ocupacao, rua, bairro, estado, descricao, foto) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [nome, email, senhaHash, idadeProcessada, ocupacaoProcessada, ruaProcessada, bairroProcessado, estadoProcessado, descricaoProcessada, fotoProcessada]
      );
      
      return { id: result.insertId, ...dadosUsuario };
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('Email já cadastrado');
      }
      throw new Error(`Erro ao criar usuário: ${error.message}`);
    }
  }

  static async atualizar(id, dadosUsuario) {
    try {
      const usuarioAtual = await this.buscarPorId(id);
      if (!usuarioAtual) {
        throw new Error('Usuário não encontrado');
      }
      const {
        nome = usuarioAtual.nome,
        email = usuarioAtual.email,
        idade = usuarioAtual.idade,
        ocupacao = usuarioAtual.ocupacao,
        rua = usuarioAtual.rua,
        bairro = usuarioAtual.bairro,
        estado = usuarioAtual.estado,
        descricao = usuarioAtual.descricao,
        foto = usuarioAtual.foto
      } = dadosUsuario;
      const idadeProcessada = idade !== undefined && idade !== '' ? parseInt(idade) : null;
      const ocupacaoProcessada = ocupacao !== undefined && ocupacao !== '' ? ocupacao : null;
      const ruaProcessada = rua !== undefined && rua !== '' ? rua : null;
      const bairroProcessado = bairro !== undefined && bairro !== '' ? bairro : null;
      const estadoProcessado = estado !== undefined && estado !== '' ? estado : null;
      const descricaoProcessada = descricao !== undefined && descricao !== '' ? descricao : null;
      const fotoProcessada = foto !== undefined && foto !== '' ? foto : null;
      const [result] = await pool.execute(
        'UPDATE usuarios SET nome = ?, email = ?, idade = ?, ocupacao = ?, rua = ?, bairro = ?, estado = ?, descricao = ?, foto = ? WHERE id = ?',
        [nome, email, idadeProcessada, ocupacaoProcessada, ruaProcessada, bairroProcessado, estadoProcessado, descricaoProcessada, fotoProcessada, id]
      );
      if (result.affectedRows === 0) {
        throw new Error('Usuário não encontrado');
      }
      return { id, nome, email, idade, ocupacao, rua, bairro, estado, descricao, foto };
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('Email já cadastrado');
      }
      throw new Error(`Erro ao atualizar usuário: ${error.message}`);
    }
  }

  static async deletar(id) {
    try {
      const [result] = await pool.execute('DELETE FROM usuarios WHERE id = ?', [id]);
      
      if (result.affectedRows === 0) {
        throw new Error('Usuário não encontrado');
      }
      
      return { message: 'Usuário deletado com sucesso' };
    } catch (error) {
      throw new Error(`Erro ao deletar usuário: ${error.message}`);
    }
  }

  static async autenticar(email, senha) {
    try {
      const usuario = await this.buscarPorEmail(email);
      
      if (!usuario) {
        return null;
      }

      const senhaValida = await bcrypt.compare(senha, usuario.senha);
      
      if (!senhaValida) {
        return null;
      }

      return {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        idade: usuario.idade,
        ocupacao: usuario.ocupacao,
        rua: usuario.rua,
        bairro: usuario.bairro,
        estado: usuario.estado,
        descricao: usuario.descricao,
        foto: usuario.foto
      };
    } catch (error) {
      throw new Error(`Erro na autenticação: ${error.message}`);
    }
  }
}

export default Usuario; 