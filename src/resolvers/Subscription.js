const Subscription = {
  comment: {
    subscribe(parent, { post }, { prisma }, info) {
      return prisma.subscription.comment({
        where: {
          node: {
            post: {
              id: post
            }
          }
        }
      }, info) 
    },
  },
  post: {
    subscribe(parent, args, { prisma }, info) {
      return prisma.subscription.post({
        where: {
          node: {
            published: true
          }
        }
      }, info)
    }
  }
}

export default Subscription
