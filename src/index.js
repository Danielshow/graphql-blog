import { GraphQLServer, PubSub } from 'graphql-yoga'
import db from './db'
import Query from './resolvers/Query'
import Subscription from './resolvers/Subscription'
import Post from './resolvers/Post'
import User from './resolvers/User'
import Comment from './resolvers/Comment'
import Mutation from './resolvers/Mutation'
import './prisma' 
const pubsub = new PubSub()
const resolvers = {
    Query,
    Post, 
    User, 
    Comment,
    Mutation,
    Subscription
}
  
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    db,
    pubsub
  }
});

server.start(() => {
  console.log("The server has started");
})
