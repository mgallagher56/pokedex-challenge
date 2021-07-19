import React from 'react'
import { graphql } from 'gatsby'
import { getImage } from 'gatsby-plugin-image'

import Seo from '../components/Seo'
import { Container } from '@material-ui/core'
import PokemonDetailCard from '../components/PokemonDetailCard'
import SimplifiedHeader from '../components/SimpleHeader'
/**
 * PokemonDetail provides a page template to render
 *
 * a new Pokemon page via Gatsby createPage API in gatsby-node.js
 */
const PokemonDetail = ({ data }) => {
  const { name, remoteImage, image, description, pokemonNumber } = data.allPokemon.nodes[0]
  const gatsbyImg = getImage(remoteImage)

  return (
    <main>
      <Seo />
      <SimplifiedHeader title={name} btnText='See all Pokemon' />
      <Container maxWidth='md'>
        <PokemonDetailCard
          gatsbyImg={gatsbyImg}
          fallbackImg={image}
          title={name}
          description={description}
          id={pokemonNumber}
        />
      </Container>
    </main>
  )
}
export const [pokemonDetails] = graphql`
query ($name: String!) {
  allPokemon(filter: { name: { eq: $name } }) {
    nodes {
      name
      description
      image
      pokemonNumber
      remoteImage {
        childImageSharp {
          gatsbyImageData(
            formats: [WEBP, AVIF, AUTO]
            placeholder: BLURRED
            tracedSVGOptions: {background: "#1B8FD3", color: "#FF6F58"}
          )
        }
      }
    }
  }
}
`

export default PokemonDetail
