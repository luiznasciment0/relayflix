import {
  Environment,
  FetchFunction,
  Network,
  RecordSource,
  Store
} from 'relay-runtime'
import fetchGraphQL from '../services/fetchGraphQL'

const fetchRelay: FetchFunction = async (params, variables) =>
  await fetchGraphQL(params.text as string, variables)

export default new Environment({
  network: Network.create(fetchRelay),
  store: new Store(new RecordSource())
})
