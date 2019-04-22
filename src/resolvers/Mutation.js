import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import getUserId from '../utils/getUserId.js'

const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    if (args.data.password.length < 8) {
      throw new Error("Password must be 8 chacters or longer")
    }
    const emailTaken = await prisma.exists.User({email: args.data.email})

    if (emailTaken) {
      throw new Error("Email already taken")
    }
    const password = await bcrypt.hash(args.data.password, 10)

    const user = await prisma.mutation.createUser({
      data: 
        { ...args.data, password }})
    return {
      user,
      token: jwt.sign({userId: user.id}, 'thisisasecret')
    }
  },

  async loginUser(parent, args, { prisma }, info) {
    const user = await prisma.query.user({ 
      where: {email: args.data.email}
    })
    if (!user) {
      throw new Error('Invalid email or Password')
    }
    const isMatched = await bcrypt.compare(args.data.password, user.password)
    if (!isMatched) {
      throw new Error("Invalid Email or Password")
    }
    
    return {
      user,
      token: jwt.sign({ userId: user.id }, 'thisisasecret')
    }
    
  },

  async deleteUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    const userExists = await prisma.exists.User({id: userId})
    
    if (!userExists) {
      throw new Error("User not found")
    }

    return prisma.mutation.deleteUser({
      where: {
      id: userId
      }
    }, info)  
  },
  
  async updateUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    const {data} = args
    const user = await prisma.exists.User({ id: userId });

    if (!user) {
      throw new Error("User not Found")
    }
    
    return prisma.mutation.updateUser({
      data,
      where: {
        id: userId
      }
    }, info)
  },

  async createPost(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    const isUserExist = await prisma.exists.User({id: userId})

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
            id: userId
          }
        }
      }
    }, info)
  },

  async deletePost(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    const isPostExist = await prisma.exists.Post({ 
        id: args.id,
        author: {
          id: userId 
        }
    })
    if (!isPostExist){
      throw new Error("Unable to delete post")
    }
    return prisma.mutation.deletePost({where: {
      id: args.id
    }}, info)
  },

  async updatePost(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    const { id, data } = args
    const post = await prisma.exists.Post({
      id: args.id,
      author: {
        id: userId
      }
    }) 
    if (!post) {
      throw new Error("Unable to update post")
    }

    return prisma.mutation.updatePost({
      where: {
        id
      }, 
      data
    }, info)
  },

  async createComment(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
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
          connect: { id: userId }
        },
        post: {
          connect: {id: args.data.post}
        }
      }
    }, info)
  },

  async deleteComment(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    const comment = await prisma.exists.Comment({
      id: args.id,
      author: {
        id: userId
      }
    })

    if (!comment){
      throw new Error("Unable to delete Comment")
    }

    return prima.mutation.deleteComment({where: {
      id: args.id
    }},info)
  },
  
  async updateComment(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    const {id, data} = args
    const comment = await prisma.exists.Comment({
      id,
      author: {
        id: userId
      }
    })

    if (!comment) {
      throw new Error("Unable to update comment")
    }
    
    return prisma.mutation.updateComment({where: {
      id
    }, data: {
      ...data
    }}, info)
  }
}

export default Mutation


