import { GraphQLObjectType } from 'graphql'
import createUser from './createUser'
import addUserInterests from './addUserInterests'

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser,
    addUserInterests
  }
})

export default Mutation
