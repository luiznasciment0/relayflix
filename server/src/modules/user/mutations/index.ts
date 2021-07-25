import { GraphQLObjectType } from 'graphql'
import createUser from './createUser'

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser
  }
})

export default Mutation
