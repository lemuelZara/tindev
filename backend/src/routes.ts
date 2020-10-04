import { Router } from 'express';

const routes = Router();

routes.get('/', (_, res) => {
  return res.status(200).json({
    message: 'Ok!a',
  });
});

export default routes;
