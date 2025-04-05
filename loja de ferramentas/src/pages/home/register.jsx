import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css'; 
import api from '../../services/api';  // Importe a instância do Axios configurada

const Register = () => {
  const navigate = useNavigate();

  // Estado para armazenar os valores do formulário e erros
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  // Regex para validação de email e senha
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const senhaRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Função para registrar o novo usuário
  async function registrar() {
    try {
      // Realiza a requisição POST para o back-end com os dados do usuário
      const response = await api.post('/register', {
        name: nome,
        email,
        password: senha
      });

      // Se o cadastro for bem-sucedido, redireciona para a página de login
      if (response.status === 201) {
        navigate('/login');
      }
    } catch (err) {
      console.error('Erro ao registrar usuário:', err);
      setError('Erro ao registrar o usuário. Verifique os dados e tente novamente.');
    }
  }

  // Função de validação do formulário
  const validarFormulario = (e) => {
    e.preventDefault();

    // Validação de nome
    if (nome.trim() === '') {
      setError('Nome é obrigatório');
      return;
    }

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

    // Se passar nas validações, chama a função de registro
    setError('');
    registrar();
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1 className="register-title">
          Cadastro<br />
          <span>Loja de Carros</span>
        </h1>
        
        <form className="register-form" onSubmit={validarFormulario}>
          <div className="form-group">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              placeholder="Digite seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
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

          <button type="submit" className="register-button" onClick={() => navigate('/login')}>
            Cadastrar
          </button>
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

export default Register;
