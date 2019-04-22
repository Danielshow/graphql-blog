import getUserId from '../utils/getUserId'
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
      
    },

  async post(parent, args, { prisma, request }, info) {
    const userId = getUserId(request, false)
    const posts = await prisma.query.posts({
      where: {
        id: args.id,
        OR: [{
          published: true
        }, {
          author: {
            id:userId
          }
        }]
      }
    }, info)

    if (posts.length === ){
      throw new Error "Post not found"
    }
  }
}

export default Query

