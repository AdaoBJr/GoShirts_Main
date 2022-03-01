import { applyMiddleware } from 'graphql-middleware';

import makeSchema from '../../graphql';
import { checkAuthentication } from './checkAuthentication';

const middleware = [checkAuthentication];

const schema = applyMiddleware(makeSchema, ...middleware);

export default schema;
