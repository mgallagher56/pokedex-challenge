const fetch = require('node-fetch')

exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest
}) => {
  await FetchPaginatedPokemon()
    .then(pokemons => {
      createNode({
        pokemons: pokemons,
        id: 'pokemon-list',
        parent: null,
        children: [],
        internal: {
          type: 'pokemonData',
          contentDigest: createContentDigest(pokemons)
        }
      })
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
                  pokemon.image = pokemonDetail.sprites.other['official-artwork'].front_default
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
