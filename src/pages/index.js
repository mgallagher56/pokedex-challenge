import * as React from 'react'
import Seo from '../components/Seo'
import ListPokemonData from '../components/ListPokemon'
import SimplifiedHeader from '../components/SimpleHeader'
import { useStaticQuery, graphql } from 'gatsby'

const IndexPage = () => {
  // query
  const data = useStaticQuery(graphql`
    query PokemonQuery {
      allPokemon(limit: 151) {
        nodes {
          name
          pokemonNumber
          image
          remoteImage {
            childImageSharp {
              gatsbyImageData(
                width: 125
                formats: [AVIF, WEBP, AUTO]
                placeholder: TRACED_SVG
                tracedSVGOptions: {background: "#1B8FD3", color: "#FF6F58"}
              )
            }
          }
        }
      }
    }
  `)

  const allPokemon = data.allPokemon.nodes

  return (
    <main>
      <Seo />
      <SimplifiedHeader title='Pokedex' />
      <ListPokemonData itemsPerPage={20} data={allPokemon} />
    </main>
  )
}

export default IndexPage
