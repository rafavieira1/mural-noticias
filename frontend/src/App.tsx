import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import NoticiasList from './components/NoticiasList';
import NoticiaForm from './components/NoticiaForm';
import NoticiaEdit from './components/NoticiaEdit';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="container">
          <Routes>
            <Route path="/" element={<NoticiasList />} />
            <Route path="/criar" element={<NoticiaForm />} />
            <Route path="/editar/:id" element={<NoticiaEdit />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App; 