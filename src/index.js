import { GraphQLServer } from 'graphql-yoga'

let users = [{
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

let posts = [{
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

let comments = [{
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
 
  type Mutation {
    createUser(data: CreateUserInput!): User!
    deleteUser(id: ID): User!
    createComment(data: CreateCommentInput!): Comment!
    createPost(data: CreatePostInput!): Post!
  }

  input CreateUserInput {
    name: String!
    email: String!
    age: Int
  }

  input CreatePostInput {
    title: String!
    body: String!
    publised: Boolean!
    authorId: ID!
  }

  input CreateCommentInput {
    text: String!
    authorId: ID!
    postId: ID!
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
  },

  Mutation: {
    createUser(parent, args, ctx, info) {
      emailTaken = users.some((user) => {
        return user.email === args.data.email
      })

      if (emailTaken) {
        throw new Error("Email already taken")
      }

      const user = {
        id: Time.now(),
        email: args.data.email,
        name: args.data.name,
        age: args.data.age
      }

      users.push(user)
      return user
    },

    deleteUser(parent, args, ctx, info) {
      const userIndex = users.find((user) => user.id === args.id)
      if (userIndex === -1) {
        throw new Error("User not found")
      }

      const deletedUsers = users.splice(userIndex, 1)
      posts = posts.filter((post) => {
        const match = post.authorId === args.id 
        if (match) {
          comments = comments.filter((comment) => {
            return comment.postId !== post.id
          })
        }
        return !match
      })    

      comments = comments.filter((comment) => {
        comment.authorId !== args.id
      })
      return deletedUsers

    },

    createPost(parent, args, ctx, info) {
      isUserExist = users.some((user) => {
        return user.id === args.data.authorId 
      })

      if (!isUserExist) {
        throw new Error("User does not exist")
      }

      const post = {
        id: Time.now(),
        title: args.data.title,
        body: args.data.body,
        published: args.data.published,
        authorId: args.data.authorId
      }

      posts.push(post)
      return post
    },

    createComment(parent, args, ctx, info) {
      isUserExist = users.some((user) => {
        return user.id === args.data.author.id
      })

      if (!isUserExist) {
        throw new Error("User does not Exist")
      }

      isPostExist = posts.some((post) => {
        return post.id === args.data.postId && post.published == true
      })

      if (!isPostExist) {
        throw new Error("Post not found")
      }

      const comment = {
        id: Time.now(),
        text: args.data.text,
        authorId: args.data.authorId,
        postId: args.data.postId
      }

      comments.push(comment)

      return comment
    }
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => {
  console.log("The server has started");
})
