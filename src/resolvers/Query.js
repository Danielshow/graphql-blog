const Query = {
    comments(parent, args, { db }, info) {
      return db.comments
    },

    posts(parent, args, { db }, info) {
      if (!args.query) {
        return db.posts;
      }
      return db.posts.filter((post) => {
        const isTitle = post.title.toLowerCase().includes(args.query.toLowerCase());
        const isBody = post.body.toLowerCase().includes(args.query.toLowerCase());
        return isBody || isTitle
      })
    },

    users(parent, args, { db }, info) {
      if (!args.query) {
        return db.users 
      }
      return db.users.filter((x) => {
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
  }

export default Query

