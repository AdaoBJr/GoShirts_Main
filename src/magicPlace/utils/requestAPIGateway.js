import { GraphQLClient } from 'graphql-request';

const requestAPIGateway = async ({ data }) => {
  const client = new GraphQLClient(process.env.HASURA_URL);

  const { variables, query, token } = data;
  const headers = token && { authorization: token };

  return Object.values(await client.request(query, variables, headers))[0];
};

export default requestAPIGateway;
