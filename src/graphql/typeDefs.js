import path from 'path';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';

const typeDefsArray = loadFilesSync(path.join(__dirname, 'modules', '**', '*.gql'));

const typeDefs = mergeTypeDefs(typeDefsArray);

export default typeDefs;
