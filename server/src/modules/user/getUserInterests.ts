import { pool } from 'src'

export const getUserInterests = async (email: string) => {
  try {
    const userInterests = await pool.query(
      'select interests from users where email = ($1)',
      [email]
    )

    return userInterests
  } catch (error) {
    console.log(`Error on getUserInterests: ${error}`)
  }
}
