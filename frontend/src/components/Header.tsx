import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  const token = localStorage.getItem('jwt_token');

  const handleLogout = () => {
    localStorage.removeItem('jwt_token');
    window.location.href = '/';
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          📰 Mural de Notícias
        </Link>
        
        <nav className="nav">
          <Link to="/" className="nav-link">🏠 Início</Link>
          {token ? (
            <>
              <Link to="/criar" className="nav-link">➕ Nova Notícia</Link>
              <button onClick={handleLogout} className="nav-link logout-btn">
                🚪 Sair
              </button>
            </>
          ) : (
            <Link to="/login" className="nav-link">🔑 Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header; 