import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './NoticiaForm.css';

const NoticiaForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titulo: '',
    conteudo: '',
    categoria: 'Geral'
  });
  const [loading, setLoading] = useState(false);

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

      await axios.post('/api/noticias', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      alert('Notícia criada com sucesso!');
      navigate('/');
    } catch (err: any) {
      alert(err.response?.data?.error || 'Erro ao criar notícia');
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

  return (
    <div className="noticia-form">
      <h2>📝 Criar Nova Notícia</h2>
      
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
            {loading ? 'Criando...' : 'Criar Notícia'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoticiaForm; 