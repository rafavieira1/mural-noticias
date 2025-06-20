const express = require('express');
const { validateToken } = require('../middleware/auth');
const NoticiasController = require('../controllers/noticiasController');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Noticia:
 *       type: object
 *       required:
 *         - titulo
 *         - conteudo
 *         - autor
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único da notícia
 *         titulo:
 *           type: string
 *           description: Título da notícia
 *         conteudo:
 *           type: string
 *           description: Conteúdo da notícia
 *         autor:
 *           type: string
 *           description: Nome do autor
 *         data_criacao:
 *           type: string
 *           format: date-time
 *           description: Data de criação
 *         categoria:
 *           type: string
 *           description: Categoria da notícia
 */

/**
 * @swagger
 * /api/noticias:
 *   get:
 *     summary: Lista todas as notícias
 *     tags: [Notícias]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de notícias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Noticia'
 *       401:
 *         description: Token inválido
 */
router.get('/', validateToken, NoticiasController.listarNoticias);

/**
 * @swagger
 * /api/noticias/{id}:
 *   get:
 *     summary: Busca uma notícia por ID
 *     tags: [Notícias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da notícia
 *     responses:
 *       200:
 *         description: Notícia encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Noticia'
 *       404:
 *         description: Notícia não encontrada
 *       401:
 *         description: Token inválido
 */
router.get('/:id', validateToken, NoticiasController.buscarNoticia);

/**
 * @swagger
 * /api/noticias:
 *   post:
 *     summary: Cria uma nova notícia
 *     tags: [Notícias]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - conteudo
 *             properties:
 *               titulo:
 *                 type: string
 *               conteudo:
 *                 type: string
 *               categoria:
 *                 type: string
 *     responses:
 *       201:
 *         description: Notícia criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Noticia'
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token inválido
 */
router.post('/', validateToken, NoticiasController.criarNoticia);

/**
 * @swagger
 * /api/noticias/{id}:
 *   put:
 *     summary: Atualiza uma notícia
 *     tags: [Notícias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               conteudo:
 *                 type: string
 *               categoria:
 *                 type: string
 *     responses:
 *       200:
 *         description: Notícia atualizada
 *       404:
 *         description: Notícia não encontrada
 *       401:
 *         description: Token inválido
 */
router.put('/:id', validateToken, NoticiasController.atualizarNoticia);

/**
 * @swagger
 * /api/noticias/{id}:
 *   delete:
 *     summary: Remove uma notícia
 *     tags: [Notícias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Notícia removida
 *       404:
 *         description: Notícia não encontrada
 *       401:
 *         description: Token inválido
 */
router.delete('/:id', validateToken, NoticiasController.removerNoticia);

module.exports = router; 