import { GraphQLObjectType } from 'graphql'
import UserRegisterMutation from './UserRegisterMutation'
import UserAddInterestsMutation from './UserAddInterestsMutation'

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    UserRegisterMutation,
    UserAddInterestsMutation
  }
})

export default Mutation
