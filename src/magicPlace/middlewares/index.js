import { applyMiddleware } from 'graphql-middleware';

import makeSchema from '../../graphql';
import checkAuth from './checkAuth';

const middleware = [checkAuth];

const schema = applyMiddleware(makeSchema, ...middleware);

export default schema;
