import { Router } from 'express';

import DevController from './controllers/DevController';
import DislikeController from './controllers/DislikeController';
import LikeController from './controllers/LikeController';

const routes = Router();

routes.post('/devs', DevController.store);
routes.post('/devs/:id/likes', LikeController.store);
routes.post('/devs/:id/dislikes', DislikeController.store);

routes.get('/devs', DevController.index);

export default routes;
