import { pool } from '../..'

export const getAllUsers = async () => {
  try {
    const users = await pool.query('select * from users2')

    return users?.rows
  } catch (error) {
    throw Error(`Error when getting all users: ${error}`)
  }
}
