import { makeExecutableSchema } from 'graphql-tools'
import { typeDefs } from './type-defs'
import { resolvers } from './resolvers'

export const schema = new makeExecutableSchema({
    typeDefs,
    resolvers,
});