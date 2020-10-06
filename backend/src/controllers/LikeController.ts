import { Request, Response } from 'express';

import Dev from '../models/Dev';

class LikeController {
  async store(req: Request, res: Response) {
    const { id } = req.params;
    const { user_id } = req.headers;

    const loggedDev = await Dev.findById(user_id);
    const targetDev = await Dev.findById(id);

    if (!targetDev) {
      return res.status(400).json({ error: 'Dev not exists' });
    }

    if (targetDev.likes.includes(loggedDev?._id)) {
      console.log('Match!');
    }

    loggedDev?.likes.push(targetDev._id);

    await loggedDev?.save();

    return res.status(200).json(loggedDev);
  }
}

export default new LikeController();
