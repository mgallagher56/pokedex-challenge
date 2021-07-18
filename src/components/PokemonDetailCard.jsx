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
    marginTop: theme.spacing(15)
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

const PokemonDetailCard = (props) => {
  const {
    card,
    cardTitle,
    cardMedia,
    cardContent
  } = useStyles()

  return (
    <Card className={card}>
      {props.gatsbyImg
        ? <GatsbyImage
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
        <Typography variant='h5' component='h5' className={cardTitle}>
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
