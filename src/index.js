import { GraphQLServer } from 'graphql-yoga'

const users = [{
  id: 1,
  name: 'Tolu',
  email: 'dan@yahoo.com',
  age: 6
}, {
  id:2,
  name: 'Daniel',
  email: "dan@emaail.com",
  age: 7
}]

const posts = [{
  id: 1,
  title: "Going home",
  body: "Home sweet home",
  published: false,
  authorId: 1,
  commentId: 1
}, {
  id: 2,
  title: "peculiar",
  body: "peculiar is precious to me",
  published: true,
  authorId: 1,
  commentId: 1
}
]

const comments = [{
  id: 1,
  text: '33j3',
  authorId: 1,
  postId: 1
},
  {
    id: 2,
    text: 'I am home',
    authorId: 2,
    postId: 2
  }]
// scaler types: String, Int, Float, Boolean, ID
// type definition
const typeDefs = `
  type Query {
    comments: [Comment!]!
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
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    publised: Boolean!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }
`

// resolver
const resolvers = {
  Query: {
    comments(parent, args, ctx, info) {
      return comments
    },

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
  },

  Post: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.authorId
      })
    },

    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.postId == parent.id 
      })
    }
  },

  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => {
        return post.authorId === parent.id
      });
    },

    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.authorId == parent.id
      })
    }
  },

  Comment: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.authorId
      })
    },

    post(parent, args, ctx, info) {
      return posts.find((post) => {
        return parent.id === post.commentId
      })
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
