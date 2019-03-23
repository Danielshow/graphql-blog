const Comment = {
    author(parent, args, { db }, info) {
      return db.users.find((user) => {
        return user.id === parent.authorId
      })
    },

    post(parent, args, { db }, info) {
      return db.posts.find((post) => {
        return parent.id === post.commentId
      })
    }
}

export default Comment

