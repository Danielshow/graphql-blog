import { extractFragmentReplacements } from 'prisma-binding'
import Query from './Query'
import Subscription from './Subscription'
import Post from './Post'
import User from './User'
import Comment from './Comment'
import Mutation from './Mutation'

const resolvers = {
  Query,
  Subscription,
  Post,
  User,
  Comment,
  Mutation,
}

const fragmentReplacements = extractFragmentReplacements(resolvers)

export { resolvers, fragmentReplacements }
