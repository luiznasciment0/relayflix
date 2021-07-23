import { GraphQLList, GraphQLObjectType, GraphQLString } from "graphql"
import { pool } from "../.."
import { fetchMovieByTitle } from "../../services/movies"
import { fetchYoutubeVideos } from "../../services/videos"
import MoviesQueryType from "./movies"
import VideosQueryType from "./videos"
import UserType from "../../modules/user/UserType"

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    moviesByTitle: {
      type: MoviesQueryType,
      args: {
        title: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        const { title } = args
        return await fetchMovieByTitle(title)
      },
    },
    videosByTitle: {
      type: VideosQueryType,
      args: {
        title: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        const { title } = args
        return await fetchYoutubeVideos(title)
      }
    },
    users: {
      type: GraphQLList(UserType),
      resolve: async (parent, args) => {
        const getAllUsers = async () => {
          try {
            const users = await pool.query('select * from users')

            return users?.rows
          } catch (error) {
            console.log('error', error)
          }
        }

        const data = await getAllUsers()

        return data
      }
    }
  }
})

export default RootQuery