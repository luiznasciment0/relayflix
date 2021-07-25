import { GraphQLList, GraphQLString } from 'graphql'
import bcrypt from 'bcrypt'
import { pool } from '../../../index'
import UserType from '../../../modules/user/UserType'
import { getAllUsers } from '../getAllUsers'

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
    const insertNewUser = await pool.query(
      'insert into users2 (name, username, email, password, interests) values ($1, $2, $3, $4, $5)',
      [name, username, email, password, interests]
    )

    return insertNewUser?.rows
  } catch (error) {
    throw Error(`Error when inserting new user: ${error}`)
  }
}

const createUser = {
  type: UserType,
  args: {
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    interests: { type: GraphQLList(GraphQLString) }
  },
  resolve: async (_parent: any, args: any) => {
    const { name, username, email, password, interests } = args

    const isMissingUserData =
      !name || !username || !email || !password || !interests

    const allUsers = await getAllUsers()
    const passwordHashSalt = await bcrypt.genSalt(10)

    if (isMissingUserData) {
      const missedUserData: { [key: string]: boolean } = {
        missingName: !name,
        missingEmail: !email,
        missingUsername: !username,
        missingPassword: !password,
        missingInterests: !interests
      }

      for (const key in missedUserData) {
        if (missedUserData[key]) {
          throw Error(`Missing user data: ${missedUserData[key]}`)
        }
      }
    }

    if (allUsers.includes(email)) {
      throw Error('User already exists!')
    }

    const hashedPassword = await bcrypt.hash(password, passwordHashSalt)

    return await createNewUser({
      name,
      username,
      email,
      password: hashedPassword,
      interests
    })
  }
}

export default createUser
