import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'syncwithu_user',
  password: process.env.DB_PASSWORD || 'syncwithu123',
  database: process.env.DB_NAME || 'syncwithu_db',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

export const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('conectou');
    connection.release();
    return true;
  } catch (error) {
    console.error('erro ao conectar com mysql:', error.message);
    return false;
  }
}

export const createTables = async () => {
  try {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS usuarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        senha VARCHAR(255) NOT NULL,
        idade INT,
        ocupacao TEXT,
        endereco TEXT,
        foto VARCHAR(255),
        descricao TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;
    
    await pool.execute(createTableQuery);
    console.log('tabela de usuarios criada/verificada com sucesso!');
  } catch (error) {
    console.error('erro ao criar tabela:', error.message);
  }
};

export default pool; 