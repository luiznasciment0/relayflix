import { GraphQLString, GraphQLNonNull, GraphQLList } from 'graphql'
import { pool } from '../../../'
import UserType from '../../../modules/user/UserType'

type AddUserInterests = {
  email: string
  interests: string[]
}

const insertUserInterests = async (interests: string[], email: string) => {
  try {
    const newInterests = await pool.query(
      'update users set interests = ($1) where email = ($2)',
      [interests, email]
    )

    return {
      isInterestsAdded: newInterests.rowCount > 0,
      error: null
    }
  } catch (error) {
    return {
      isInterestsAdded: null,
      error: Error(`Error when adding users interests: ${error}`)
    }
  }
}

const addUserInterests = {
  type: UserType,
  args: {
    email: { type: GraphQLNonNull(GraphQLString) },
    interests: { type: GraphQLNonNull(GraphQLList(GraphQLString)) }
  },
  resolve: async (_parent: any, args: any) => {
    const { email, interests }: AddUserInterests = args

    const addInterests = await insertUserInterests(interests, email)

    if (addInterests.error || !addInterests.isInterestsAdded) {
      return {
        interests: null,
        error: addInterests.error
      }
    }

    return {
      interests: {
        email,
        interests
      },
      error: null
    }
  }
}

export default addUserInterests
