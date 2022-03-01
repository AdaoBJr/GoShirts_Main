import { ApolloError } from 'apollo-server';

const ApiError = ({ msg, code }) => {
  throw new ApolloError(msg, code);
};

export default ApiError;
