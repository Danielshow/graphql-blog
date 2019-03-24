import uuidv4 from "uuid/v4"
const Mutation = {
  createUser(parent, args, { db }, info) {
    const emailTaken = db.users.some((user) => {
      return user.email === args.data.email
    })

    if (emailTaken) {
      throw new Error("Email already taken")
    }

    const user = {
      id: uuidv4(),
      email: args.data.email,
      name: args.data.name,
      age: args.data.age
    }

    db.users.push(user)
      return user
    },

  deleteUser(parent, args, { db }, info) {
    const userIndex = db.users.find((user) => user.id === args.id)
    if (userIndex == -1) {
      throw new Error("User not found")
    }

    const deletedUsers = db.users.splice(userIndex, 1)
      db.posts = db.posts.filter((post) => {
        const match = post.authorId == args.id 
        if (match) {
          db.comments = db.comments.filter((comment) => {
            return comment.postId !== post.id
          })
        }
        return !match
    })    

    db.comments = db.comments.filter((comment) => {
      comment.authorId !== args.id
    })
    return deletedUsers[0]

  },
  
  updateUser(parent, args, { db }, info) {
    const {id, data} = args
    const user = db.users.find((user) => {
      return user.id == id
    })  
    if (!user) {
      throw new Error("User not Found")
    }
   
    if (typeof data.email === "string") {
      const isEmailTaken = db.users.some((user) => user.email === data.email)
      if (isEmailTaken) {
        throw new Error("Email already Taken")
      }

      user.email = data.email
    }

    if (typeof data.name === "string") {
      user.name = data.name
    }

    if (typeof data.age !== 'undefined') {
      user.age = data.age
    }
    return user
  },

  createPost(parent, args, { db }, info) {
    const isUserExist = db.users.some((user) => {
       return user.id == args.data.authorId 
    })

    if (!isUserExist) {
      throw new Error("User does not exist")
    }

    const post = {
      id: uuidv4(),
      title: args.data.title,
      body: args.data.body,
      published: args.data.published,
      authorId: args.data.authorId
    }

    db.posts.push(post)
    return post
  },

  deletePost(parent, args, { db }, info) {
    const postIndex = db.posts.findIndex((post) => post.id === args.id)
    if (postIndex == -1){
      throw new Error("Post not Found")
    }

    const deletedPost = db.posts.splice(postIndex, 1)
    db.comments = db.comments.filter((comment) => comment.postId !== args.id)
    return deletedPost[0]
  },

  updatePost(parent, args, { db }, info) {
    const { id, data } = args
    const post = db.posts.find((post) => post.id == id)
    if (!post) {
      throw new Error("Post not found")
    }

    if (typeof data.title == "string") {
      post.title = data.title
    }
    if(typeof data.body == "string"){
      post.body = data.body
    }
    
    if (typeof data.published == "boolean") {
      post.published = data.published
    }

    return post
  },

  createComment(parent, args, { db }, info) {
    const isUserExist = db.users.some((user) => {
      return user.id == args.data.authorId
    })

    if (!isUserExist) {
      throw new Error("User does not Exist")
    }

    const isPostExist = db.posts.some((post) => {
      return post.id == args.data.postId && post.published
    })

    if (!isPostExist) {
      throw new Error("Post not found")
    }

    const comment = {
      id: uuidv4(),
      text: args.data.text,
      authorId: args.data.authorId,
      postId: args.data.postId
    }

    db.comments.push(comment)

    return comment
  },

  deleteComment(parent, args, { db }, info) {
    const commentIndex = db.comments.findIndex((comment) => {
      return comment.id == args.id
    })

    if (commentIndex == -1){
      throw new Error("Comment not found")
    }

    const deletedComments = db.comments.splice(commentIndex, 1)
    return deletedComments[0] 
  },
  
  updateComment(parent, args, { db }, info) {
    const {id, data} = args
    const comment = db.comments.find((comment) => comment.id == id)

    if (!comment) {
      throw new Error("Comment not found")
    }

    if (typeof data.text == "string"){
      comment.text = data.text
    }

    return comment
  }
}

export default Mutation


