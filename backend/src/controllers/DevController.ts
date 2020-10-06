import { Request, Response } from 'express';
import axios from 'axios';

import Dev, { IDev } from '../models/Dev';

interface IDevCreate {
  name: IDev['name'];
  user: IDev['user'];
  bio: IDev['bio'];
  avatar: IDev['avatar'];
}

class DevController {
  async store(req: Request, res: Response) {
    const { username } = req.body;

    const userExists = await Dev.findOne({ user: username });

    if (userExists) {
      return res.status(200).json(userExists);
    }

    const {
      data: { name, bio, avatar_url: avatar },
    } = await axios.get(`https://api.github.com/users/${username}`);

    const dev = await Dev.create<IDevCreate>({
      name,
      user: username,
      bio,
      avatar,
    });

    return res.status(200).json(dev);
  }

  async index(req: Request, res: Response) {
    const { user_id } = req.headers;

    const loggedDev = await Dev.findById(user_id);

    const devs = await Dev.find({
      $and: [
        { _id: { $ne: user_id } },
        { _id: { $nin: loggedDev?.likes } },
        { _id: { $nin: loggedDev?.dislikes } },
      ],
    });

    return res.status(200).json(devs);
  }
}

export default new DevController();
