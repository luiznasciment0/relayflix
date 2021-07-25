import { GraphQLList, GraphQLString, GraphQLNonNull } from 'graphql'
import bcrypt from 'bcrypt'
import { pool } from '../../../index'
import UserType from '../../../modules/user/UserType'
import { checkUserEmail } from '../checkUserEmail'

type CreateUserArgs = {
  name: string
  username: string
  email: string
  password: string
  interests: string[]
}

const createNewUser = async ({
  name,
  username,
  email,
  password,
  interests
}: CreateUserArgs) => {
  try {
    await pool.query(
      'insert into users2 (name, username, email, password, interests) values ($1, $2, $3, $4, $5)',
      [name, username, email, password, interests]
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
  password,
  interests
}: CreateUserArgs) => {
  const missedUserData: { [key: string]: boolean } = {
    missingName: !name,
    missingEmail: !email,
    missingUsername: !username,
    missingPassword: !password,
    missingInterests: !interests
  }

  for (const key in missedUserData) {
    if (missedUserData[key]) {
      return Error(`Missing user data: ${missedUserData[key]}`)
    }
  }
}

const createUser = {
  type: UserType,
  args: {
    name: { type: GraphQLNonNull(GraphQLString) },
    username: { type: GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLNonNull(GraphQLString) },
    interests: { type: GraphQLNonNull(GraphQLList(GraphQLString)) }
  },
  resolve: async (_parent: any, args: any) => {
    const { name, username, email, password, interests }: CreateUserArgs = args

    const isMissingUserData =
      !name || !username || !email || !password || !interests
    if (isMissingUserData) {
      return {
        user: null,
        error: checkMissedUserData({
          name,
          username,
          email,
          password,
          interests
        })
      }
    }

    const userAlreadyExists = await checkUserEmail(email)
    if (userAlreadyExists.error) {
      return {
        user: null,
        error: userAlreadyExists.error
      }
    }

    if (userAlreadyExists.userAlreadyExists) {
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
      password: hashedPassword,
      interests
    })

    if (newUser.error || !newUser.isUserCreated) {
      return {
        user: null,
        error: newUser.error
      }
    }

    return {
      user: {
        name,
        username,
        email,
        password,
        interests
      },
      error: null
    }
  }
}

export default createUser
