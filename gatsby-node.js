const fetch = require('node-fetch')
const { createRemoteFileNode } = require('gatsby-source-filesystem')
const path = require('path')

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest
}) => {
  const NODE_TYPE = 'Pokemon'

  const response = await FetchPaginatedPokemon()
  response.forEach(page => {
    page.results.forEach(pokemon => {
      actions.createNode({
        ...pokemon,
        id: createNodeId(`${NODE_TYPE}-${pokemon.id}`),
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

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const PageTemplate = path.resolve('./src/templates/PokemonDetail.jsx')

  const result = await graphql(
    `
      query pokemonList {
        allPokemon {
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
      component: PageTemplate
    })
    return null
  })
}

const FetchPaginatedPokemon = async (pokemonPerPage = 20, pageQuantity = 8) => {
  const pokeArr = []
  let offset = 0
  let url = `https://pokeapi.co/api/v2/pokemon?limit=${pokemonPerPage}&offset=${offset}`
  for (let i = 0; i < pageQuantity; i++) {
    await asyncFetch(url)
      .then(allPokemon => {
        allPokemon.results.forEach(pokemon => {
          asyncFetch(pokemon.url)
            .then(pokemonDetail => {
              asyncFetch(pokemonDetail.species.url)
                .then(species => {
                  pokemon.id = pokemonDetail.id
                  pokemon.image = {
                    id: `image-${pokemonDetail.id}`,
                    url: pokemonDetail.sprites.other['official-artwork'].front_default
                  }
                  pokemon.types = pokemonDetail.types
                  pokemon.weight = pokemonDetail.weight
                  pokemon.height = pokemonDetail.height

                  if (species.flavor_text_entries[0].language.name === 'en') {
                    pokemon.description = species.flavor_text_entries[0].flavor_text
                  } else if (species.flavor_text_entries[1].language.name === 'en') {
                    pokemon.description = species.flavor_text_entries[1].flavour_text
                  } else {
                    pokemon.description = species.flavor_text_entries[2].flavorr_text
                  }
                }).catch(err => {
                  console.error(err)
                })
            })
        })
        pokeArr.push(allPokemon)
        url = allPokemon.next
      })
    offset += pokemonPerPage
  }
  return pokeArr
}

async function asyncFetch(url) {
  let result = await fetch(url)
  result = result.json()
  return result
}
