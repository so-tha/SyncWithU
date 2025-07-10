import pool from '../config/database.js';
import bcrypt from 'bcryptjs';

class Usuario {
  static async listarTodos() {
    try {
      const [rows] = await pool.execute('SELECT id, nome, email, idade, ocupacao, endereco, descricao, created_at FROM usuarios');
      return rows;
    } catch (error) {
      throw new Error(`Erro ao listar usuários: ${error.message}`);
    }
  }

  static async buscarPorId(id) {
    try {
      const [rows] = await pool.execute(
        'SELECT id, nome, email, idade, ocupacao, endereco, descricao, created_at FROM usuarios WHERE id = ?',
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
        'SELECT id, nome, email, senha, idade, ocupacao, endereco, descricao, created_at FROM usuarios WHERE email = ?',
        [email]
      );
      return rows[0];
    } catch (error) {
      throw new Error(`Erro ao buscar usuário por email: ${error.message}`);
    }
  }

  static async criar(dadosUsuario) {
    try {
      const { nome, email, senha, idade, ocupacao, endereco, descricao } = dadosUsuario;
      const saltRounds = 10;
      const senhaHash = await bcrypt.hash(senha, saltRounds);
      
      // Tratar campos vazios
      const idadeProcessada = idade && idade !== '' ? parseInt(idade) : null;
      const ocupacaoProcessada = ocupacao && ocupacao !== '' ? ocupacao : null;
      const enderecoProcessado = endereco && endereco !== '' ? endereco : null;
      const descricaoProcessada = descricao && descricao !== '' ? descricao : null;
      
      const [result] = await pool.execute(
        'INSERT INTO usuarios (nome, email, senha, idade, ocupacao, endereco, descricao) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [nome, email, senhaHash, idadeProcessada, ocupacaoProcessada, enderecoProcessado, descricaoProcessada]
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
      const { nome, email, idade, ocupacao, endereco, descricao } = dadosUsuario;
      
      // Tratar campos vazios
      const idadeProcessada = idade && idade !== '' ? parseInt(idade) : null;
      const ocupacaoProcessada = ocupacao && ocupacao !== '' ? ocupacao : null;
      const enderecoProcessado = endereco && endereco !== '' ? endereco : null;
      const descricaoProcessada = descricao && descricao !== '' ? descricao : null;
      
      const [result] = await pool.execute(
        'UPDATE usuarios SET nome = ?, email = ?, idade = ?, ocupacao = ?, endereco = ?, descricao = ? WHERE id = ?',
        [nome, email, idadeProcessada, ocupacaoProcessada, enderecoProcessado, descricaoProcessada, id]
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
        idade: usuario.idade,
        ocupacao: usuario.ocupacao,
        endereco: usuario.endereco,
        descricao: usuario.descricao
      };
    } catch (error) {
      throw new Error(`Erro na autenticação: ${error.message}`);
    }
  }
}

export default Usuario; 