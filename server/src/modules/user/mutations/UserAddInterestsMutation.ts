import { GraphQLString, GraphQLNonNull, GraphQLList } from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'

import { errorField } from 'src/graphql/errorField'
import { successField } from 'src/graphql/successField'
import { pool } from 'src'
import { checkUserEmail } from '../checkUserEmail'

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

const UserAddInterestsMutation = mutationWithClientMutationId({
  name: 'UserAddInterestsMutation',
  inputFields: {
    email: { type: GraphQLNonNull(GraphQLString) },
    interests: { type: GraphQLNonNull(GraphQLList(GraphQLString)) }
  },
  mutateAndGetPayload: async ({ email, interests }: AddUserInterests) => {
    const hasUser = await checkUserEmail(email)
    if (!hasUser.userAlreadyExists) {
      return {
        interests: null,
        error: "User don't exist"
      }
    }

    const addInterests = await insertUserInterests(interests, email)

    if (addInterests.error || !addInterests.isInterestsAdded) {
      return {
        interests: null,
        error: addInterests.error
      }
    }

    return {
      email,
      interests,
      success: 'User interests registered with success'
    }
  },
  outputFields: {
    ...errorField,
    ...successField
  }
})

export default UserAddInterestsMutation
