import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token.trim()) {
      alert('Por favor, insira um token JWT válido');
      return;
    }

    setLoading(true);

    try {
      // Salvar token no localStorage
      localStorage.setItem('jwt_token', token);
      
      alert('Token salvo com sucesso!');
      navigate('/');
    } catch (error) {
      alert('Erro ao salvar token');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>🔑 Login</h2>
        <p className="login-description">
          Insira seu token JWT para acessar o Mural de Notícias
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="token">Token JWT</label>
            <textarea
              id="token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Cole seu token JWT aqui..."
              rows={4}
              required
            />
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              onClick={() => navigate('/')}
              className="btn btn-secondary"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Salvando...' : 'Entrar'}
            </button>
          </div>
        </form>

        <div className="login-help">
          <h3>💡 Como obter um token JWT?</h3>
          <ol>
            <li>Acesse o módulo de Autenticação</li>
            <li>Faça login com suas credenciais</li>
            <li>Copie o token JWT retornado</li>
            <li>Cole o token no campo acima</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Login; 