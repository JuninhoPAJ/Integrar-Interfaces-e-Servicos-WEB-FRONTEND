import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import api from '../../services/api';  // Certifique-se de que o axios está configurado corretamente

const Login = () => {
  const navigate = useNavigate();

  // Estado para armazenar os valores do formulário e erros
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  // Regex para validação de email e senha
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const senhaRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Função para fazer o login
  async function logar() {
    try {
      // Realiza a requisição para o back-end passando email e senha
      const response = await api.post('/login', {
        email,
        password: senha
      });

      // Se o login for bem-sucedido, armazene o token no localStorage
      if (response.status === 200 && response.data.token) {
        localStorage.setItem('token', response.data.token);
        const userEmail = email.toLowerCase();

        // Se o e-mail for específico, redireciona para a página de gerente
        if (userEmail === 'jonildo.junior@maisunifacisa.com.br') {
          navigate('/gerente');  // Redireciona para a página de gerente
        } else {
          navigate('/home');  // Redireciona para a página padrão (home)
        }
      }
    } catch (err) {
      console.error('Erro no login:', err);
      setError('Erro ao realizar o login. Verifique as credenciais e tente novamente.');
    }
  }

  // Função de validação
  const validarFormulario = (e) => {
    e.preventDefault();

    // Validação de email
    if (!emailRegex.test(email)) {
      setError('E-mail inválido');
      return;
    }

    // Validação de senha
    if (!senhaRegex.test(senha)) {
      setError('A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, um número e um caractere especial.');
      return;
    }

    // Se passar nas validações, chama a função de login
    setError('');
    logar();
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">
          Bem-vindo à<br />
          <span>Loja de Carros</span>
        </h1>

        <form className="login-form" onSubmit={validarFormulario}>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="form-input"
            />
          </div>

          {/* Exibindo mensagem de erro, se houver */}
          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-button">
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
