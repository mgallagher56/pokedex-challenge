import React from "react"
import { GatsbyImage } from 'gatsby-plugin-image'
import { makeStyles } from '@material-ui/core/styles'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { CardMedia } from '@material-ui/core'

// styles
const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)'
  },
  cardTitle: {
    textTransform: 'capitalize'
  },
  cardContent: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'left',
    flexDirection: 'column'
  }
}))

/**
 * PokemonDetailCard renders a card component to display pokemon info
 *
 * Props:
 *
 * title - adds title to card
 *
 * description - add a paragraph to provide further detail
 *
 * gatsbyImg - adds gatbsy image object for responsive images
 *
 * fallbackImg - adds a fallback image to render if gatsby image object fails
 *
 * id - adds id of pokemon
 */
const PokemonDetailCard = (props) => {
  // destructure styles for increased legibility
  const {
    card,
    cardTitle,
    cardMedia,
    cardContent
  } = useStyles()

  // markup
  return (
    <Card className={`${card} pokemon-detail-card`}>
      {props.gatsbyImg
        ? <GatsbyImage
            objectFit='contain'
            className={cardMedia}
            image={props.gatsbyImg}
            title={props.title}
            alt={props.title}
          />
        : <CardMedia
            className={cardMedia}
            image={props.fallbackImg}
            title={props.title}
            alt={props.title}
          />}
      <CardContent className={cardContent}>
        <Typography variant='h5' component='h2' className={cardTitle}>
          {props.title}
        </Typography>
        <Typography variant='body1' component='p'>
          {props.description}
        </Typography>
        <Typography variant='body1' component='p'>
          Pokemon No. {props.id}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default PokemonDetailCard
