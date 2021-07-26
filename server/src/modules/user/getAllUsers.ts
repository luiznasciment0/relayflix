import { pool } from '../..'

type User = {
  name: string
  username: string
  email: string
  password: string
  interests?: string[]
}

export const getAllUsers = async (): Promise<{
  users: User[] | null
  error: Error | null
}> => {
  try {
    const users = await pool.query('select * from users')

    return {
      users: users.rows,
      error: null
    }
  } catch (error) {
    return {
      users: null,
      error: Error(`Error when getting all users: ${error}`)
    }
  }
}
