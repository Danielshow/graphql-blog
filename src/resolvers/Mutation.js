import uuidv4 from "uuid/v4"
const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    const emailTaken = await prisma.exists.User({email: args.data.email})

    if (emailTaken) {
      throw new Error("Email already taken")
    }

    return prisma.mutation.createUser({ data: args.data }, info) 
  },

  async deleteUser(parent, args, { prisma }, info) {
    const userExists = await prisma.exists.User({id: args.id})
    
    if (!userExists) {
      throw new Error("User not found")
    }

    return prisma.mutation.deleteUser({
      where: {
      id: args.id
      }
    }, info)  
  },
  
  async updateUser(parent, args, { prisma }, info) {
    const {id, data} = args
    const user = await prisma.exists.User({ id });

    if (!user) {
      throw new Error("User not Found")
    }
    
    return prisma.mutation.updateUser({
      data,
      where: {
        id: id
      }
    }, info)
  },

  async createPost(parent, args, { prisma, pubsub }, info) {
    const isUserExist = await prisma.exists.User({id: args.authorId})

    if (!isUserExist) {
      throw new Error("User does not exist")
    }
    
    return prisma.mutation.createPost({
      data: {
        title: args.data.title,
        body: args.data.body,
        published: args.data.published,
        author: {
          connect: {
            id: args.data.author
          }
        }
      }
    }, info)
  },

  async deletePost(parent, args, { prisma, pubsub }, info) {
    const isPostExist = await prisma.exists.Post({id: args.id})
    if (!isPostExist){
      throw new Error("Post not Found")
    }
    return prisma.mutation.deletePost({where: {
      id: args.id
    }}, info)
  },

  async updatePost(parent, args, { prisma, pubsub }, info) {
    const { id, data } = args
    const post = await prisma.exists.Post({id: args.id}) 
    if (!post) {
      throw new Error("Post not found")
    }

    return prisma.mutation.updatePost({
      where: {
        id
      }, 
      data
    }, info)
  },

  async createComment(parent, args, { prisma, pubsub }, info) {
    const isUserExist = await prisma.exists.User({id: args.author})

    if (!isUserExist) {
      throw new Error("User does not Exist")
    }

    const isPostExist = await prisma.exists.Post({
      id: args.post,
      published: true
    })

    if (!isPostExist) {
      throw new Error("Post not found")
    }

    return prisma.mutation.createComment({
      data: {
        text: args.data.text,
        author: {
          connect: { id: args.data.author }
        },
        post: {
          connect: {id: args.data.post}
        }
      }
    }, info)
  },

  async deleteComment(parent, args, { prisma, pubsub }, info) {
    const comment = await prisma.exists.Comment({id: args.id})

    if (!comment){
      throw new Error("Comment not found")
    }

    return prima.mutation.deleteComment({where: {
      id: args.id
    }},info)
  },
  
  async updateComment(parent, args, { prisma, pubsub }, info) {
    const {id, data} = args
    const comment = await prisma.exists.Comment({id})

    if (!comment) {
      throw new Error("Comment not found")
    }
    
    return prisma.mutation.updateComment({where: {
      id
    }, data: {
      ...data
    }}, info)
  }
}

export default Mutation


