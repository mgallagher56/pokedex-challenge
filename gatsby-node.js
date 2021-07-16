const fetch = require('node-fetch')

exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest
}) => {
  FetchPaginatedPokemon()
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

const FetchPaginatedPokemon = async () => {
  const pokeObj = { page: {} }
  let offset = 0

  for (let i = 0; i < 8; i++) {
    await asyncFetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`)
      .then(async allPokemon => {
        await allPokemon.results.forEach(pokemon => {
          asyncFetch(pokemon.url)
            .then(async pokemonDetail => {
              await asyncFetch(pokemonDetail.species.url)
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
        pokeObj.page['page-' + i] = allPokemon
      })
    offset += 20
    pokeObj.page['page-' + i].id = i
  }
  return pokeObj
}

async function asyncFetch(url) {
  let result = await fetch(url)
  result = await result.json()
  return result
}
