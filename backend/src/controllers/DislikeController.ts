import { Request, Response } from 'express';

import Dev from '../models/Dev';

class DislikeController {
  async store(req: Request, res: Response) {
    const { id } = req.params;
    const { user_id } = req.headers;

    const loggedDev = await Dev.findById(user_id);
    const targetDev = await Dev.findById(id);

    if (!targetDev) {
      return res.status(400).json({ error: 'Dev not exists' });
    }

    loggedDev?.dislikes.push(targetDev._id);

    await loggedDev?.save();

    return res.status(200).json(loggedDev);
  }
}

export default new DislikeController();
