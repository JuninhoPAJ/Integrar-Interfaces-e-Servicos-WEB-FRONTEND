import React from 'react'
import { useNavigate } from 'react-router-dom';

const login = () => {

    const navigate = useNavigate()
    return (
        <div className="App">
          <h1>Login <br /> Loja de Carros</h1>
          <form>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Digite seu email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="senha">Senha</label>
              <input
                type="password"
                id="senha"
                placeholder="Digite sua senha"
              />
            </div>
            <button type="submit" onClick={() => navigate('/home')}>Entrar</button>
          </form>
          <p className="registro-link">
            Não tem uma conta? <span onClick={() => navigate('/')}>Cadastre-se</span>
          </p>
        </div>
      );
}

export default login
