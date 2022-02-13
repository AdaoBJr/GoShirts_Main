import path from 'path';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { loadFiles } from '@graphql-tools/load-files';

const typeDefsArray = loadFiles(path.join(__dirname, 'modules', '**', '*.gql'));

const typeDefs = mergeTypeDefs(typeDefsArray);

export default typeDefs;
