import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql'
import { fetchMovieByTitle } from '../../services/movies'
import { fetchYoutubeVideos } from '../../services/videos'
import MoviesQueryType from './movies'
import VideosQueryType from './videos'
import UserType from '../../modules/user/UserType'
import { getAllUsers } from '../../modules/user/getAllUsers'

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  description: 'The root of all queries',
  fields: {
    moviesByTitle: {
      type: MoviesQueryType,
      args: {
        title: { type: GraphQLString }
      },
      resolve: async (_parent, args) => {
        const { title } = args
        return await fetchMovieByTitle(title)
      }
    },
    videosByTitle: {
      type: VideosQueryType,
      args: {
        title: { type: GraphQLString }
      },
      resolve: async (_parent, args) => {
        const { title } = args
        return await fetchYoutubeVideos(title)
      }
    },
    users: {
      type: GraphQLList(UserType),
      resolve: async (_parent, _args) => {
        const data = await getAllUsers()

        return data.users
      }
    }
  }
})

export default RootQuery
