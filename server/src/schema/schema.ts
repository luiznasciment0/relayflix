import { GraphQLSchema } from 'graphql'
import RootQuery from '../graphql/queries/rootQuery'
import Mutation from '../modules/user/mutations'

const Schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})

export default Schema
