const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false
});

// Criar tabela se não existir
const initDatabase = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS noticias (
        id SERIAL PRIMARY KEY,
        titulo VARCHAR(255) NOT NULL,
        conteudo TEXT NOT NULL,
        autor VARCHAR(255) NOT NULL,
        categoria VARCHAR(100) DEFAULT 'Geral',
        data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Tabela noticias criada/verificada com sucesso');
  } catch (error) {
    console.error('❌ Erro ao inicializar banco de dados:', error);
  }
};

// Inicializar banco na primeira conexão
initDatabase();

module.exports = pool; 