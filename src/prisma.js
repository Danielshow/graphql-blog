import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: "http://localhost:4466"
})

export default prisma

//const updatePostForUser = async (postId, data) => {
//  const isPostExist = await prima.exists.Post({id: postId})
//  if (!isPostExist) {
//    throw new Error("Post not found")
//  }
//  const post = await prisma.mutation.updatePost({
//    where: {
//      id: postId
//    },
//    data
//  }, '{author {id name email posts {id title published}}}');
//
//  return post.author
//}

