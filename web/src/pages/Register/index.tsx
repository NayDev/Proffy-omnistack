import React, { useState, FormEvent, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';

import './styles.css';
import api from '../../services/api';

import warningIcon from '../../assets/images/icons/warning.svg';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';

interface ServerResponse {
  success: boolean;
  access_token: string;
}

function Register() {
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      api.defaults.headers.common['Authorization'] = token;
      history.push('/give-classes');
    }
  }, [])

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  function handleCreateUser(e: FormEvent) {
    e.preventDefault();

    api.post<ServerResponse>('register', {
      name,
      email,
      password,
      avatar,
      whatsapp,
      bio
    }).then(response => {
      const { data } = response;
      const { access_token } = data;
      api.defaults.headers.common['Authorization'] = access_token;
      localStorage.setItem('access_token', access_token);
      alert('Cadastro realizado com sucesso!');
      history.push('/');
    })
      .catch(() => alert('Erro no cadastro!'));
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo é preencher esse formulário de inscrição"
      />

      <main>
        <form onSubmit={handleCreateUser}>
          <fieldset>
            <legend>
              Seus dados
              <div className="loginText">
                Já tem uma conta? <Link to="/login">Login</Link>
              </div>
            </legend>

            <Input
              name="name"
              label="Nome completo"
              value={name}
              onChange={e => { setName(e.target.value) }}
            />
            <Input
              name="email"
              type="email"
              label="Seu melhor email"
              value={email}
              onChange={e => { setEmail(e.target.value) }}
            />
            <Input
              name="password"
              type="password"
              label="Senha secreta"
              value={password}
              onChange={e => { setPassword(e.target.value) }}
            />
            <Input
              name="avatar"
              label="Avatar"
              value={avatar}
              onChange={e => { setAvatar(e.target.value) }}
            />
            <Input
              name="whatsapp"
              label="WhatsApp"
              value={whatsapp}
              onChange={e => { setWhatsapp(e.target.value) }}
            />
            <Textarea
              name="bio"
              label="Biografia"
              value={bio}
              onChange={e => { setBio(e.target.value) }}
            />
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante! <br />
              Preencha todos os dados
            </p>
            <button type="submit">
              Salvar cadastro
            </button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default Register;