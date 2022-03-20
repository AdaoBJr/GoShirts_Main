import { applyMiddleware } from 'graphql-middleware';

import makeSchema from '../../graphql';
import checkAuth from './checkAuth';
import checkData from './checkData';

const middleware = [checkAuth, checkData];

const schema = applyMiddleware(makeSchema, ...middleware);

export default schema;
