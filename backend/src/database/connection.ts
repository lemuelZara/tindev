import mongoose from 'mongoose';

import { MONGO_USER, MONGO_PASSWORD, MONGO_DB } from '../utils/environment';

mongoose.connect(
  `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@localhost:27017/${MONGO_DB}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.connection.once('open', () =>
  console.log('Connection to database made successfully')
);
