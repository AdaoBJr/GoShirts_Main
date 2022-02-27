import 'dotenv/config';
import '../repositories/mongodb/connection';
import { ApolloServer } from 'apollo-server';

export default function startSever({ typeDefs, resolvers }) {
  const { PORT } = process.env;
  const app = new ApolloServer({
    typeDefs,
    resolvers,
    context: (req) => req.headers || '',
  });

  app.listen(PORT || 4000, () =>
    console.log(`🔥 App Running on https://studio.apollographql.com/`)
  );
}
