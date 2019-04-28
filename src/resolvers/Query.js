import getUserId from '../utils/getUserId'

const Query = {
    comments(parent, args, { prisma }, info) {
      const opArgs = {}
      if (args.query) {
        opArgs.where = {
          OR: [{
            name_contains: args.query
          }]
        }
      }
      return prisma.query.comments(opArgs, info)
    },

    posts(parent, args, { prisma }, info) {
      const opArgs = {
        where: {
          published: true
        }
      }
      if (args.query) {
        opArgs.where.OR = [{
            title_contains: args.query
          }, {
            body_contains: args.query
          }]
      }
      return prisma.query.posts(opArgs, info) 
    },

    users(parent, args, { prisma }, info) {
      return prisma.query.users(null, info)
    },

    async me(parent, args, { prisma, request }, info) {
      const userId = getUserId(request)
      const user = prisma.query.user({
        where: {
          id: userId
        }
      })
      return user
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

    if (posts.length === 0 ){
      throw new Error("Post not found")
    }

    return posts[0]
  },

  myPosts(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    const opArgs = {
      where: {
        author: {
          id: userId
        }
      }
    }
    if (args.query) {
      opArgs.where.OR = [{
            title_contains: args.query
          }, {
            body_contains: args.query
          }]
    }
    return prisma.query.posts(opArgs, info)  
  }
}

export default Query

