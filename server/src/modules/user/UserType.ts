import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql'
import { globalIdField } from 'graphql-relay'

import { GraphQLContext } from 'src/graphql/types'
import { pool } from 'src/index'
import { nodeInterface, registerTypeLoader } from '../node/typeRegister'
import { getUserInterests } from './getUserInterests'

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
      resolve: async (user) => await getUserInterests(user.email)
    }
  }),
  interfaces: () => [nodeInterface]
})

registerTypeLoader(UserType, async (context: GraphQLContext, id: string) => {
  if (!id) {
    return null
  }

  try {
    const data = await pool.query(
      'select name, username, email, interests from users where email = ($1)',
      [context.user?.email]
    )

    if (!data) {
      return null
    }

    return data
  } catch (error) {
    console.log(`Error on registerTypeLoader UserType: ${error}`)
    return null
  }
})
