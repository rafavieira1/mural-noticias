const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Importar rotas
const noticiasRoutes = require('./routes/noticias');
const authMiddleware = require('./middleware/auth');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Configuração Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mural de Notícias API',
      version: '1.0.0',
      description: 'API do módulo Mural de Notícias',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Servidor de desenvolvimento',
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Rotas
app.use('/api/noticias', noticiasRoutes);

// Rota de health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'Mural de Notícias', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor Mural de Notícias rodando na porta ${PORT}`);
  console.log(`📚 Documentação disponível em: http://localhost:${PORT}/api-docs`);
}); 