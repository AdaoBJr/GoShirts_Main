import 'dotenv/config';
import '../repositories/mongodb/connection';
import { ApolloServer } from 'apollo-server';

import schema from '../magicPlace/middlewares';

export default function startSever() {
  const { PORT } = process.env;

  const app = new ApolloServer({
    schema,
    context: (req) => req.headers || '',
  });

  app.listen(PORT || 4000, () =>
    console.log(`🔥 App Running on https://studio.apollographql.com/`)
  );
}
