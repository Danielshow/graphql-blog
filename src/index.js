import { GraphQLServer } from 'graphql-yoga'

const users = [{
  id: 1,
  name: 'Tolu',
  email: 'dan@yahoo.com',
  age: 6
}]

const posts = [{
  id: 1,
  title: "Going home",
  body: "Home sweet home",
  published: false
}, {
  id: 2,
  title: "peculiar",
  body: "peculiar is precious to me",
  published: true
}
]
// scaler types: String, Int, Float, Boolean, ID
// type definition
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    me: User!
    post: Post!
  }
  
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    publised: Boolean!
  }
`

// resolver
const resolvers = {
  Query: {
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts;
      }
      return posts.filter((post) => {
        const isTitle = post.title.toLowerCase().includes(args.query.toLowerCase());
        const isBody = post.body.toLowerCase().includes(args.query.toLowerCase());
        return isBody || isTitle
      })
    },
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users 
      }
      return users.filter((x) => {
        return x.name.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    me() {
      return {
        id: '78',
        name: 'daniel',
        email: 'dan@gmail.com',
        age: 28
      }
    },
    post() {
      return {
        id: '7888',
        title: 'ejdhhdhd',
        body: 'I am ping',
        publised: true
      }
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
