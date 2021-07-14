import * as React from 'react'
import { StaticQuery, graphql } from 'gatsby'

const ListPokemons = () => {
  return (
    <StaticQuery
      query={graphql`
        query PokemonQuery {
          pokemonData {
            pokemons {
              name,
              image,
              url,
              id
            }
          }
        }
      `}
      render={data => (
        data.pokemonData.pokemons.map(pokemon => {
          console.log(pokemon)
          return (
            <div key={pokemon.id}>
              <h1>{pokemon.name}</h1>
            </div>
          )
        })
      )}
    />
  )
}
export default ListPokemons
