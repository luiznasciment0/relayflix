import { Variables } from 'react-relay'

const fetchGraphQL = async (text: string, variables?: Variables) => {
  try {
    const response = await fetch(
      'https://movies-videos-graphql.herokuapp.com/graphql',
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          query: text,
          variables
        })
      }
    )

    return await response.json()
  } catch (error) {
    throw Error(`fetchGraphQL failed request: ${error}`)
  }
}

export default fetchGraphQL
