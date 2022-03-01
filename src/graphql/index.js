import { makeExecutableSchema } from '@graphql-tools/schema';
import resolvers from './resolvers';
import typeDefs from './typeDefs';

const makeSchema = makeExecutableSchema({ typeDefs, resolvers });

export default makeSchema;
