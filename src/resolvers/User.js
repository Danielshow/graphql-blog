const User = {
    posts(parent, args, { db }, info) {
      return db.posts.filter((post) => {
        return post.authorId === parent.id
      });
    },

    comments(parent, args, { db }, info) {
      return db.comments.filter((comment) => {
        return comment.authorId == parent.id
      })
    }
}

export default User
