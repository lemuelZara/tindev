import express from 'express';
import cors from 'cors';
import http from 'http';
import socketIO from 'socket.io';

import routes from './routes';
import './database/connection';

const app = express();

const httpServer = new http.Server(app);
const io = socketIO(httpServer);

interface IConnectedUsers {
  [userId: string]: string;
}

const connectedUsers = {} as IConnectedUsers;

io.on('connection', (socket) => {
  const { user } = socket.handshake.query;

  connectedUsers[user] = socket.id;
});

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
});
app.use(cors());
app.use(express.json());
app.use(routes);

httpServer.listen(3333);
