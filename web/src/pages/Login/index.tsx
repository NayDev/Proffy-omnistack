import React, { useState, useEffect, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logonImg from '../../assets/images/logon.svg';

import Input from '../../components/Input';
import api from '../../services/api';

import './styles.css';



interface ServerResponse {
  success: boolean;
  access_token: string;
}

function Login() {
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      api.defaults.headers.common['Authorization'] = token;
      history.push('/study');
    }
  }, [])
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin(e: FormEvent) {
    e.preventDefault();

    api.post<ServerResponse>('login', {
      email,
      password
    })
      .then(response => {
        const { data } = response;
        const { access_token } = data;
        api.defaults.headers.common['Authorization'] = access_token;
        localStorage.setItem('access_token', access_token);
        history.push('/give-classes');
      })
      .catch(() => alert('Erro no login!'));
  }
  
  return (
    <div id="login-form" className="container">
     <img className="logon" src={logonImg} alt="Logon"/>
      <main>
        <form onSubmit={handleLogin}>
          <fieldset>
            <legend>
              Fazer login
              
            </legend>
           
            <Input
              name="email"
              type="email"
              label="E-mail"
              value={email}
              onChange={e => { setEmail(e.target.value) }}
            />
            <Input
              name="password"
              type="password"
              label="Senha"
              value={password}
              onChange={e => { setPassword(e.target.value) }}
            />
            
            <div className="loginText">
                Não tem uma conta? <Link to="/register">Registrar</Link>
              </div>
          </fieldset>
          
          <footer>
            <button type="submit">
              Entrar
            </button>
            
          </footer>
        </form>
      </main>
    </div>
  );
}

export default Login;