const fetch = require('node-fetch')
const { createRemoteFileNode } = require('gatsby-source-filesystem')
const path = require('path')

// creates new local nodes from fetched data in graphql
exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest
}) => {
  const NODE_TYPE = 'Pokemon'

  const response = await getPokemonData()
  response.forEach(page => {
    page.results.forEach(pokemon => {
      actions.createNode({
        ...pokemon,
        id: createNodeId(`${NODE_TYPE}-${pokemon.pokemonNumber}`),
        parent: null,
        children: [],
        internal: {
          type: NODE_TYPE,
          contentDigest: createContentDigest(pokemon)
        }
      })
    })
  })
}

// creates local copies of external images from fetched data
// to use with Gatsby Image
exports.onCreateNode = async ({
  node,
  actions: { createNode },
  createNodeId,
  getCache
}) => {
  if (node.internal.type === 'Pokemon') {
    if (typeof node.image !== 'undefined') {
      const fileNode = await createRemoteFileNode({
        url: node.image,
        parentNodeId: node.id,
        createNode,
        createNodeId,
        getCache
      })

      if (fileNode) {
        node.remoteImage___NODE = fileNode.id
      }
    }
  }
}

// programatically creates pages from graphql query.
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage, createRedirect } = actions

  // sets redirect from /pokemon to index
  createRedirect({
    fromPath: '/pokemon/',
    toPath: '/',
    isPermanent: true,
    redirectInBrowser: true
  })

  const PageTemplate = path.resolve('./src/templates/PokemonDetail.jsx')
  const result = await graphql(
    `
      query pokemonList {
        allPokemon(limit: 151) {
          nodes {
            name
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.')
    return
  }

  result.data.allPokemon.nodes.forEach(pokemon => {
    createPage({
      path: `/pokemon/${pokemon.name}`,
      component: PageTemplate,
      context: {
        name: pokemon.name
      }
    })
    return null
  })
}

// nested fetch requests to pull data from pokemon api
// specific to data structure of pokemon api
const getPokemonData = async (pokemonPerPage = 20, pageQuantity = 15) => {
  const pokeArr = []
  let url = `https://pokeapi.co/api/v2/pokemon?limit=${pokemonPerPage}&offset=0`

  // loop to get pokemon data as paginated results
  for (let i = 0; i < pageQuantity; i++) {
    // fetch all pokemon
    await asyncFetch(url)

      // fetch detailed info on each pokemon
      .then(allPokemon => {
        allPokemon.results.forEach(pokemon => {
          asyncFetch(pokemon.url)

            // fetch species info on each pokemon
            // to retireve nested description
            .then(pokemonDetail => {
              asyncFetch(pokemonDetail.species.url)

                // update pokemon object to add custom information
                .then(species => {
                  pokemon.pokemonNumber = pokemonDetail.id
                  pokemon.image = pokemonDetail.sprites.other['official-artwork'].front_default

                  // flavour_text_entries are descriptions in multiple different languages.
                  // The loop is needed to check for the language we want
                  const textEntries = species.flavor_text_entries.length
                  for (let i = 0; i < textEntries; i++) {
                    if (species.flavor_text_entries[i].language.name === 'en') {
                      pokemon.description = species.flavor_text_entries[i].flavor_text
                    }
                  }
                })
            })
        })

        // add updated pokemon objects to array
        pokeArr.push(allPokemon)

        // get fetch url for next page of pokemon
        url = allPokemon.next
      }).catch(err => { console.error(err) })
  }
  // return list of paginated
  return pokeArr
}

// helper function to make getPokemonData function more readable
async function asyncFetch(url) {
  let result = await fetch(url)
  result = result.json()
  return result
}
