const Query = {
    comments(parent, args, { prisma }, info) {
      const opArgs = {}
      if (args.query) {
        opArgs.where = {
          OR: [{
            name_contains: args.query
          }, {
            email_contains: args.query
          }]
        }
      }
      return prisma.query.comments(opArgs, info)
    },

    posts(parent, args, { prisma }, info) {
      const opArgs = {}
      if (args.query) {
        opArgs.where = {
          OR: [{
            title_contains: args.query
          }, {
            body_contains: args.query
          }]
        }
      }
      return prisma.query.posts(opArgs, info) 
    },

    users(parent, args, { prisma }, info) {
      return prisma.query.users(null, info)
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

