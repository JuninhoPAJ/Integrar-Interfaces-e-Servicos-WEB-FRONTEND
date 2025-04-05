import React from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css'; 

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">
          Bem-vindo à<br />
          <span>Loja de Carros</span>
        </h1>
        
        <form className="login-form">
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

          <button type="submit" className="login-button" onClick={() => navigate('/home')}>
            Entrar
          </button>
        </form>

        <p className="register-link">
          Não tem uma conta?{' '}
          <span 
            className="register-span"
            onClick={() => navigate('/')}
          >
            Cadastre-se
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;

