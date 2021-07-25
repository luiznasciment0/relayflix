import { pool } from '../..'

export const checkUserEmail = async (email: string) => {
  try {
    const emails = await pool.query(
      'select email from users2 where email = ($1)',
      [email]
    )

    return {
      userAlreadyExists: emails.rowCount > 0,
      error: null
    }
  } catch (error) {
    return {
      userAlreadyExists: null,
      error: Error(`Error when checking users email: ${error}`)
    }
  }
}