const Mutation = {
  createUser(parent, args, { db }, info) {
    emailTaken = db.users.some((user) => {
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

    db.users.push(user)
      return user
    },

  deleteUser(parent, args, { db }, info) {
    const userIndex = db.users.find((user) => user.id === args.id)
    if (userIndex === -1) {
      throw new Error("User not found")
    }

    const deletedUsers = db.users.splice(userIndex, 1)
      db.posts = db.posts.filter((post) => {
        const match = post.authorId === args.id 
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
     
  },

  createPost(parent, args, { db }, info) {
    isUserExist = db.users.some((user) => {
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

    db.posts.push(post)
    return post
  },

  deletePost(parent, args, { db }, info) {
    const postIndex = db.posts.findIndex((post) => post.id === args.id)
    if (postIndex === -1){
      throw new Error("Post not Found")
    }

    const deletedPost = db.posts.splice(postIndex, 1)
    db.comments = db.comments.filter((comment) => comment.postId !== args.id)
    return deletedPost[0]
  },

  createComment(parent, args, { db }, info) {
    isUserExist = db.users.some((user) => {
      return user.id === args.data.author.id
    })

    if (!isUserExist) {
      throw new Error("User does not Exist")
    }

    isPostExist = db.posts.some((post) => {
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

    db.comments.push(comment)

    return comment
  },

  deleteComment(parent, args, { db }, info) {
    const commentIndex = db.comments.findIndex((comment) => {
      return comment.id === args.id
    })

    if (commentIndex === -1){
      throw new Error("Comment not found")
    }

    deletedComments = db.comments.splice(commentIndex, 1)
    return deletedComments[0] 
  }
}

export default Mutation


