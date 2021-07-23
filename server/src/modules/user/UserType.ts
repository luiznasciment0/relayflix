import { GraphQLList, GraphQLObjectType, GraphQLString } from "graphql"

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    _id: { type: GraphQLString },
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    interests: { type: GraphQLList(GraphQLString) },
  })
})

export default UserType