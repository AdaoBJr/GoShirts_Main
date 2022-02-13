import startSever from './server/startServer';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

startSever({ typeDefs, resolvers });
