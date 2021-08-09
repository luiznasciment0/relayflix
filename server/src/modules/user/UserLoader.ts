import { GraphQLContext } from 'src/graphql/types'
import { pool } from 'src'

export const UserLoader = {
  load: async (context: GraphQLContext, id: string) => {
    if (!id) {
      return null
    }

    try {
      const data = await pool.query(
        'select name, username, email, interests from users where email = ($1)',
        [context.user?.email]
      )

      if (!data) {
        return null
      }

      return data
    } catch (error) {
      console.log(`Error on registerTypeLoader UserType: ${error}`)
      return null
    }
  }
}
