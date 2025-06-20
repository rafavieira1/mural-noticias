const axios = require('axios');

/**
 * Middleware para validar JWT através do módulo Auth
 */
const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }

    // Validar token no módulo Auth
    const authServiceUrl = process.env.AUTH_SERVICE_URL || 'http://auth-service:3000';
    
    const response = await axios.post(`${authServiceUrl}/api/auth/validate`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.status === 200) {
      req.user = response.data.user;
      next();
    } else {
      return res.status(401).json({ error: 'Token inválido' });
    }
  } catch (error) {
    console.error('Erro ao validar token:', error.message);
    return res.status(401).json({ error: 'Token inválido ou serviço Auth indisponível' });
  }
};

module.exports = { validateToken }; 