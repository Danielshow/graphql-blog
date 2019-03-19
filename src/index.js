import { GraphQLServer } from 'graphql-yoga'

// type definition
const typeDefs = `
  type Query {
    hello: String!
  }
`

// resolver
const resolvers = {
  Query: {
    hello() {
      return 'This is my first query'
    }
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => {
  console.log("The server has started");
});
