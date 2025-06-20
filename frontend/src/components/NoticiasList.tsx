import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './NoticiasList.css';

interface Noticia {
  id: number;
  titulo: string;
  conteudo: string;
  autor: string;
  categoria: string;
  data_criacao: string;
}

const NoticiasList: React.FC = () => {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    carregarNoticias();
  }, []);

  const carregarNoticias = async () => {
    try {
      const token = localStorage.getItem('jwt_token');
      if (!token) {
        setError('Token não encontrado. Faça login primeiro.');
        setLoading(false);
        return;
      }

      const response = await axios.get('/api/noticias', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setNoticias(response.data);
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao carregar notícias');
    } finally {
      setLoading(false);
    }
  };

  const deletarNoticia = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja deletar esta notícia?')) {
      return;
    }

    try {
      const token = localStorage.getItem('jwt_token');
      await axios.delete(`/api/noticias/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setNoticias(noticias.filter(n => n.id !== id));
    } catch (err: any) {
      alert(err.response?.data?.error || 'Erro ao deletar notícia');
    }
  };

  if (loading) {
    return <div className="loading">Carregando notícias...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
        <Link to="/login" className="btn btn-primary">Fazer Login</Link>
      </div>
    );
  }

  return (
    <div className="noticias-list">
      <div className="header">
        <h1>📰 Mural de Notícias</h1>
        <Link to="/criar" className="btn btn-primary">➕ Nova Notícia</Link>
      </div>

      {noticias.length === 0 ? (
        <div className="empty-state">
          <p>Nenhuma notícia encontrada.</p>
          <Link to="/criar" className="btn btn-secondary">Criar primeira notícia</Link>
        </div>
      ) : (
        <div className="noticias-grid">
          {noticias.map((noticia) => (
            <div key={noticia.id} className="noticia-card">
              <div className="noticia-header">
                <h3>{noticia.titulo}</h3>
                <span className="categoria">{noticia.categoria}</span>
              </div>
              <p className="conteudo">{noticia.conteudo.substring(0, 150)}...</p>
              <div className="noticia-footer">
                <span className="autor">Por: {noticia.autor}</span>
                <span className="data">
                  {new Date(noticia.data_criacao).toLocaleDateString('pt-BR')}
                </span>
              </div>
              <div className="acoes">
                <Link 
                  to={`/editar/${noticia.id}`}
                  className="btn btn-secondary"
                >
                  ✏️ Editar
                </Link>
                <button 
                  onClick={() => deletarNoticia(noticia.id)}
                  className="btn btn-danger"
                >
                  🗑️ Deletar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NoticiasList; 