import { GraphQLObjectType, GraphQLTypeResolver } from 'graphql'
import { fromGlobalId, nodeDefinitions } from 'graphql-relay'
import { GraphQLContext } from 'src/graphql/types'

type Load = (context: GraphQLContext, id: string) => any
type TypeLoaders = {
  [key: string]: {
    type: GraphQLObjectType
    load: Load
  }
}

const getTypeRegister = () => {
  const typesLoaders: TypeLoaders = {}

  const getTypesLoaders = () => typesLoaders

  const registerTypeLoader = (type: GraphQLObjectType, load: Load) => {
    typesLoaders[type.name] = {
      type,
      load
    }

    return type
  }

  const fetchById = (globalId: string, context: GraphQLContext) => {
    const { type, id } = fromGlobalId(globalId)
    const { load } = typesLoaders[type] || { load: null }

    if (!load) return null

    return load(context, id)
  }

  const typeResolver: GraphQLTypeResolver<any, GraphQLContext> = (obj) => {
    const { type } = typesLoaders[obj.constructor.name] || { type: null }

    return type
  }

  const { nodeField, nodesField, nodeInterface } = nodeDefinitions(
    fetchById,
    typeResolver
  )

  return {
    registerTypeLoader,
    getTypesLoaders,
    nodeField,
    nodesField,
    nodeInterface
  }
}

const { registerTypeLoader, nodeInterface, nodeField, nodesField } =
  getTypeRegister()

export { registerTypeLoader, nodeInterface, nodeField, nodesField }
