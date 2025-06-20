import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './NoticiaForm.css';

const NoticiaEdit: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState({
    titulo: '',
    conteudo: '',
    categoria: 'Geral'
  });
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    carregarNoticia();
  }, [id]);

  const carregarNoticia = async () => {
    try {
      const token = localStorage.getItem('jwt_token');
      if (!token) {
        alert('Token não encontrado. Faça login primeiro.');
        navigate('/login');
        return;
      }

      const response = await axios.get(`/api/noticias/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const noticia = response.data;
      setFormData({
        titulo: noticia.titulo,
        conteudo: noticia.conteudo,
        categoria: noticia.categoria
      });
    } catch (err: any) {
      alert(err.response?.data?.error || 'Erro ao carregar notícia');
      navigate('/');
    } finally {
      setLoadingData(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('jwt_token');
      if (!token) {
        alert('Token não encontrado. Faça login primeiro.');
        navigate('/login');
        return;
      }

      await axios.put(`/api/noticias/${id}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      alert('Notícia atualizada com sucesso!');
      navigate('/');
    } catch (err: any) {
      alert(err.response?.data?.error || 'Erro ao atualizar notícia');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (loadingData) {
    return <div className="loading">Carregando notícia...</div>;
  }

  return (
    <div className="noticia-form">
      <h2>✏️ Editar Notícia</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="titulo">Título *</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            required
            placeholder="Digite o título da notícia"
          />
        </div>

        <div className="form-group">
          <label htmlFor="categoria">Categoria</label>
          <select
            id="categoria"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
          >
            <option value="Geral">Geral</option>
            <option value="Acadêmico">Acadêmico</option>
            <option value="Eventos">Eventos</option>
            <option value="Notícias">Notícias</option>
            <option value="Importante">Importante</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="conteudo">Conteúdo *</label>
          <textarea
            id="conteudo"
            name="conteudo"
            value={formData.conteudo}
            onChange={handleChange}
            required
            rows={6}
            placeholder="Digite o conteúdo da notícia"
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
            {loading ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoticiaEdit; 