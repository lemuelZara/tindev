import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import './styles.css';

import logoTindev from '../../assets/logo.svg';
import api from '../../services/api';

interface ICreateDevData {
  username: string;
}

const Login = () => {
  const [dev, setDev] = useState<ICreateDevData>({ username: '' });
  const history = useHistory();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const {
      data: { _id },
    } = await api.post('/devs', dev);

    console.log(_id);

    history.push(`/devs/${_id}`);
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <img src={logoTindev} alt="Logo" />

        <input
          type="text"
          name="login"
          placeholder="Digite seu usuário do GitHub"
          value={dev.username}
          onChange={(e) => setDev({ username: e.target.value })}
        />

        <button type="submit">Fazer Login</button>
      </form>
    </div>
  );
};

export default Login;
