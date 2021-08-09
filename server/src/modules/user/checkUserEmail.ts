import { pool } from 'src'

export const checkUserEmail = async (
  email: string
): Promise<
  | { userAlreadyExists: boolean; error: null }
  | { userAlreadyExists: null; error: Error }
> => {
  try {
    const emails = await pool.query(
      'select email from users where email = ($1)',
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
