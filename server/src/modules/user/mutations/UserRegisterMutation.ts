import { GraphQLString, GraphQLNonNull } from 'graphql'
import bcrypt from 'bcrypt'
import { mutationWithClientMutationId } from 'graphql-relay'

import { pool } from 'src'
import { errorField } from 'src/graphql/errorField'
import { successField } from 'src/graphql/successField'
import { checkUserEmail } from '../checkUserEmail'

type CreateUserArgs = {
  name: string
  username: string
  email: string
  password: string
}

const createNewUser = async ({
  name,
  username,
  email,
  password
}: CreateUserArgs) => {
  try {
    await pool.query(
      'insert into users (name, username, email, password) values ($1, $2, $3, $4)',
      [name, username, email, password]
    )

    return {
      isUserCreated: true,
      error: null
    }
  } catch (error) {
    return {
      isUserCreated: false,
      error: Error(`Error when creating new user: ${error}`)
    }
  }
}

const checkMissedUserData = ({
  name,
  email,
  username,
  password
}: CreateUserArgs) => {
  const missedUserData: { [key: string]: boolean } = {
    missingName: !name,
    missingEmail: !email,
    missingUsername: !username,
    missingPassword: !password
  }

  for (const key in missedUserData) {
    if (missedUserData[key]) {
      return Error(`Missing user data: ${missedUserData[key]}`)
    }
  }
}

const UserRegisterMutation = mutationWithClientMutationId({
  name: 'UserRegisterMutation',
  inputFields: {
    name: { type: GraphQLNonNull(GraphQLString) },
    username: { type: GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLNonNull(GraphQLString) }
  },
  mutateAndGetPayload: async ({
    name,
    username,
    email,
    password
  }: CreateUserArgs) => {
    const isMissingUserData = !name || !username || !email || !password
    if (isMissingUserData) {
      return {
        user: null,
        error: checkMissedUserData({
          name,
          username,
          email,
          password
        })
      }
    }

    const hasUser = await checkUserEmail(email)
    if (hasUser.userAlreadyExists) {
      return {
        user: null,
        error: 'User already exists'
      }
    }

    const passwordHashSalt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, passwordHashSalt)

    const newUser = await createNewUser({
      name,
      username,
      email,
      password: hashedPassword
    })

    if (newUser.error || !newUser.isUserCreated) {
      return {
        user: null,
        error: newUser.error
      }
    }

    return {
      email,
      success: 'User registered with success'
    }
  },
  outputFields: {
    ...errorField,
    ...successField
  }
})

export default UserRegisterMutation
