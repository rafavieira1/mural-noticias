const db = require('../config/database');

class NoticiasController {
  /**
   * Lista todas as notícias
   */
  static async listarNoticias(req, res) {
    try {
      const result = await db.query(
        'SELECT * FROM noticias ORDER BY data_criacao DESC'
      );
      res.json(result.rows);
    } catch (error) {
      console.error('Erro ao listar notícias:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  /**
   * Busca uma notícia por ID
   */
  static async buscarNoticia(req, res) {
    try {
      const { id } = req.params;
      const result = await db.query(
        'SELECT * FROM noticias WHERE id = $1',
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Notícia não encontrada' });
      }

      res.json(result.rows[0]);
    } catch (error) {
      console.error('Erro ao buscar notícia:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  /**
   * Cria uma nova notícia
   */
  static async criarNoticia(req, res) {
    try {
      const { titulo, conteudo, categoria } = req.body;
      const autor = req.user.nome || req.user.email;

      if (!titulo || !conteudo) {
        return res.status(400).json({ error: 'Título e conteúdo são obrigatórios' });
      }

      const result = await db.query(
        'INSERT INTO noticias (titulo, conteudo, autor, categoria, data_criacao) VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
        [titulo, conteudo, autor, categoria || 'Geral']
      );

      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Erro ao criar notícia:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  /**
   * Atualiza uma notícia
   */
  static async atualizarNoticia(req, res) {
    try {
      const { id } = req.params;
      const { titulo, conteudo, categoria } = req.body;

      const result = await db.query(
        'UPDATE noticias SET titulo = COALESCE($1, titulo), conteudo = COALESCE($2, conteudo), categoria = COALESCE($3, categoria) WHERE id = $4 RETURNING *',
        [titulo, conteudo, categoria, id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Notícia não encontrada' });
      }

      res.json(result.rows[0]);
    } catch (error) {
      console.error('Erro ao atualizar notícia:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  /**
   * Remove uma notícia
   */
  static async removerNoticia(req, res) {
    try {
      const { id } = req.params;
      const result = await db.query(
        'DELETE FROM noticias WHERE id = $1 RETURNING *',
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Notícia não encontrada' });
      }

      res.json({ message: 'Notícia removida com sucesso' });
    } catch (error) {
      console.error('Erro ao remover notícia:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

module.exports = NoticiasController; 