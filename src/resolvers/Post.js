const Post= {
    author(parent, args, { db }, info) {
      return db.users.find((user) => {
        return user.id === parent.authorId
      })
    },

    comments(parent, args, { db }, info) {
      return db.comments.filter((comment) => {
        return comment.postId == parent.id 
      })
    }
}

export default Post

