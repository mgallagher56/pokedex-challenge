import React from 'react'
import { graphql, Link } from 'gatsby'
import { getImage } from 'gatsby-plugin-image'

import Seo from '../components/Seo'
import { AppBar, Button, Container, Toolbar, Typography } from '@material-ui/core'
import PokemonDetailCard from '../components/PokemonDetailCard'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  appBar: {
    width: '100%',
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2)
  },
  title: {
    textTransform: 'capitalize'
  },
  button: {
    marginRight: theme.spacing(8)
  }
}))

const PokemonDetail = ({ data }) => {
  const { appBar, title, button } = useStyles()
  const { name, remoteImage, image, description, pokemonNumber } = data.allPokemon.nodes[0]
  const gatsbyImg = getImage(remoteImage)
  return (
    <main>
      <Seo />
      <AppBar position='relative' className={appBar}>
        <Toolbar>
          <Link to='/'>
            <Button
              variant='contained'
              color='secondary'
              size='small'
              className={button}
            >
              Back to all Pokemon
            </Button>
          </Link>
          <Typography variant='h3' component='h1' className={title}>
            {name}
          </Typography>
        </Toolbar>
      </AppBar>
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
