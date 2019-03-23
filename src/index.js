import { GraphQLServer } from 'graphql-yoga'
import db from './db'
import Query from './resolvers/Query'
import Post from './resolvers/Post'
import User from './resolvers/User'
import Comment from './resolvers/Comment'
import Mutation from './resolvers/Mutation'

const resolvers = {
    Query,
    Post, 
    User, 
    Comment,
    Mutation
}
  
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    db
  }
});

server.start(() => {
  console.log("The server has started");
})
