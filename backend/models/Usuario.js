import pool from '../config/database.js';
import bcrypt from 'bcryptjs';

class Usuario {
  static async listarTodos() {
    try {
      const [rows] = await pool.execute('SELECT id, nome, email, telefone, idade, created_at FROM usuarios');
      return rows;
    } catch (error) {
      throw new Error(`Erro ao listar usuários: ${error.message}`);
    }
  }

  static async buscarPorId(id) {
    try {
      const [rows] = await pool.execute(
        'SELECT id, nome, email, telefone, idade, created_at FROM usuarios WHERE id = ?',
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
        'SELECT * FROM usuarios WHERE email = ?',
        [email]
      );
      return rows[0];
    } catch (error) {
      throw new Error(`Erro ao buscar usuário por email: ${error.message}`);
    }
  }

  static async criar(dadosUsuario) {
    try {
      const { nome, email, senha, telefone, idade } = dadosUsuario;
      const saltRounds = 10;
      const senhaHash = await bcrypt.hash(senha, saltRounds);
      
      const [result] = await pool.execute(
        'INSERT INTO usuarios (nome, email, senha, telefone, idade) VALUES (?, ?, ?, ?, ?)',
        [nome, email, senhaHash, telefone, idade]
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
      const { nome, email, telefone, idade } = dadosUsuario;
      
      const [result] = await pool.execute(
        'UPDATE usuarios SET nome = ?, email = ?, telefone = ?, idade = ? WHERE id = ?',
        [nome, email, telefone, idade, id]
      );
      
      if (result.affectedRows === 0) {
        throw new Error('Usuário não encontrado');
      }
      
      return { id, ...dadosUsuario };
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
        telefone: usuario.telefone,
        idade: usuario.idade
      };
    } catch (error) {
      throw new Error(`Erro na autenticação: ${error.message}`);
    }
  }
}

export default Usuario; 