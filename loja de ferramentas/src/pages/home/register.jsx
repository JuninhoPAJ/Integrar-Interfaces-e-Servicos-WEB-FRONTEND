import React from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css'; 
import api from '../../services/api';

const Home = () => {

  const navigate = useNavigate();

  return (
    <div className="register-container">
      <div className="register-card">
        <h1 className="register-title">
          Cadastro<br />
          <span>Loja de Carros</span>
        </h1>
        
        <form className="register-form">
          <div className="form-group">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              placeholder="Digite seu nome"
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              placeholder="Digite seu e-mail"
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              placeholder="Digite sua senha"
              required
              className="form-input"
            />
          </div>

          <button className="register-button" onClick={() => navigate('/login')}>Cadastrar</button>
        </form>
        <p className="register-link">
          Já tem uma conta?{' '}
          <span 
            className="register-span"
            onClick={() => navigate('/login')}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Home;
