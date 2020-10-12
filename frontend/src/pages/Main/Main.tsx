import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import io from 'socket.io-client';

import './Main.css';

import api from '../../services/api';

import tindevLogo from '../../assets/logo.svg';
import like from '../../assets/like.svg';
import dislike from '../../assets/dislike.svg';
import brokenHearth from '../../assets/broken-heart.svg';
import itsAMatch from '../../assets/itsamatch.png';

interface MatchParams {
  id: string;
}

interface IDevPlate {
  id: string;
  name: string;
  bio: string;
  avatar: string;
}

interface IDev {
  name: string;
  user: string;
  bio: string;
  avatar: string;
  likes: [string];
  dislikes: [string];
}

const Main: React.FC = () => {
  const match = useRouteMatch<MatchParams>();

  const [devs, setDevs] = useState<IDevPlate[]>([]);
  const [matchDev, setMatchDev] = useState<IDev>();

  useEffect(() => {
    async function loadDevs(): Promise<void> {
      const { data } = await api.get('/devs', {
        headers: {
          user_id: match.params.id,
        },
      });

      const newDataDevs = data.map((dev: any) => {
        return {
          id: dev._id,
          ...dev,
        };
      });

      setDevs(newDataDevs);
    }

    loadDevs();
  }, [match.params.id]);

  useEffect(() => {
    const socket = io('http://localhost:3333', {
      query: { user: match.params.id },
    });

    socket.on('match', (dev: IDev) => {
      setMatchDev(dev);
    });
  }, [match.params.id]);

  async function handleLike(id: string): Promise<void> {
    await api.post(`/devs/${id}/likes`, null, {
      headers: {
        user_id: match.params.id,
      },
    });

    setDevs(devs.filter((dev) => dev.id !== id));
  }

  async function handleDislike(id: string): Promise<void> {
    await api.post(`/devs/${id}/dislikes`, null, {
      headers: {
        user_id: match.params.id,
      },
    });

    setDevs(devs.filter((dev) => dev.id !== id));
  }

  return (
    <div className="main-container">
      <Link to="/">
        <img src={tindevLogo} alt="Logo" />
      </Link>

      {devs.length > 0 ? (
        <ul>
          {devs.map((dev) => (
            <li key={dev.id}>
              <img src={dev.avatar} alt="Avatar" />

              <footer>
                <strong>{dev.name}</strong>
                <p>{dev.bio}</p>
              </footer>

              <div className="buttons">
                <button type="button" onClick={() => handleLike(dev.id)}>
                  <img src={like} alt="Like" />
                </button>
                <button type="button" onClick={() => handleDislike(dev.id)}>
                  <img src={dislike} alt="Dislike" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty">
          <p>Acabou... :C</p>
          <img src={brokenHearth} alt="Coração quebrado" />
        </div>
      )}

      {matchDev && (
        <div className="match-container">
          <img src={itsAMatch} alt="Match" />
          <img src={matchDev.avatar} alt="" className="avatar" />
          <strong>{matchDev.name}</strong>
          <p>{matchDev.bio}</p>

          <button type="button" onClick={() => setMatchDev(undefined)}>
            FECHAR
          </button>
        </div>
      )}
    </div>
  );
};

export default Main;
