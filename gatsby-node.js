/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */
const fetch = require('node-fetch')

const gqlQuery = `query pokemons($limit: Int, $offset: Int) {
  pokemons(limit: $limit, offset: $offset) {
    count
    next
    previous
    status
    message
    results {
      url
      name
      image
    }
  }
}`

const gqlVariables = {
  limit: 152,
  offset: 0
}

exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest
}) => {
  const result = await fetch('https://graphql-pokeapi.vercel.app/api/graphql', {
    credentials: 'omit',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: gqlQuery,
      variables: gqlVariables
    }),
    method: 'POST'
  })
  const resultData = await result.json()
  createNode({
    pokeName: resultData,
    url: resultData,
    id: 'example-build-time-data',
    parent: null,
    children: [],
    internal: {
      type: 'pokemonData',
      contentDigest: createContentDigest(resultData)
    }
  })
}
