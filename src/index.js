import { readFileSync } from 'fs'
import { ApolloServer } from 'apollo-server'
import resolvers from './resolvers'
import query from './query'

console.log(process.cwd())

const server = new ApolloServer({
  typeDefs: readFileSync('./src/schema.graphql', 'UTF8'),
  resolvers,
  context: { query }
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});