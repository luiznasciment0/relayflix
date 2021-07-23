import { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql"

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    interests: { type: GraphQLList(GraphQLString) },
  })
})

export default UserType