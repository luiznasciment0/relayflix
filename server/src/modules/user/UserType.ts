import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql'
import {
  connectionArgs,
  connectionDefinitions,
  globalIdField
} from 'graphql-relay'

import { nodeInterface, registerTypeLoader } from '../node/typeRegister'
import { getUserInterests } from './getUserInterests'
import { UserLoader } from './UserLoader'

export interface IUser {
  name: string
  username: string
  email: string
  password: string
  interests?: string[]
}

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: globalIdField('User'),
    name: {
      type: GraphQLString,
      resolve: (user) => user.name
    },
    username: {
      type: GraphQLString,
      resolve: (user) => user.username
    },
    email: {
      type: GraphQLString,
      resolve: (user) => user.email
    },
    password: { type: GraphQLString },
    interests: {
      type: GraphQLList(GraphQLString),
      args: {
        ...connectionArgs
      },
      resolve: async (user) => await getUserInterests(user.email)
    }
  }),
  interfaces: () => [nodeInterface]
})

registerTypeLoader(UserType, UserLoader.load)

export const UserConnection = connectionDefinitions({
  name: 'User',
  nodeType: UserType
})
