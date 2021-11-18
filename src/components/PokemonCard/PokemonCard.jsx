import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { makeStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { CardMedia } from '@material-ui/core'

// styles
const useStyles = makeStyles((theme) => ({
  card: {
    display           : 'flex',
    flexDirection     : 'column',
    height            : '100%',
    transition        : 'all .3s ease-out',
    transitionProperty: 'box-shadow, transform',
    '&:hover' : {
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
      transform: 'translate3d(0px, -2px, 0px)'
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'row',
      maxHeight    : '100px'
    }
  },
  cardTitle: {
    textTransform: 'capitalize'
  },
  cardMedia: {
    [theme.breakpoints.down('xs')]: {
      width: '33%'
    }
  },
  cardContent: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'left',
    [theme.breakpoints.down('xs')]: {
      alignItems: 'center'
    }
  }
}))

/**
 * PokemonCard renders a linked card component
 *
 * Props:
 *
 * link - adds a link to whole card component
 *
 * title - adds title to card
 *
 * description - add a paragraph to provide further detail
 *
 * gatsbyImg - adds gatbsy image object for responsive images
 *
 * fallbackImg - adds a fallback image to render if gatsby image object fails
 *
 * btnText - adds button to card and populates with text
 */
const PokemonCard = (props) => {
  // destructure styles for increased legibility
  const {
    card,
    cardTitle,
    cardMedia,
    cardContent,
    cardActions
  } = useStyles()

  // markup
  return (
    <div>
      {props.link
        ? <Link to={props.link || '/'} data-testid='pokemon-card-link'>
          <Card className={`${card} pokemon-card`} src={props.gatsbyImg}>
            {props.gatsbyImg
              ? <GatsbyImage
                  component='img'
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
                  component='img'
                />}
            <CardContent className={`${cardContent} card-content`}>
              {props.title
                ? <Typography data-testid='pokemon-card-title' variant='h5' component='h2' className={cardTitle}>
                  {props.title}
                </Typography>
                : null}
              {props.description
                ? <Typography data-testid='pokemon-card-description' variant='body1' component='p'>
                  {props.description}
                </Typography>
                : null}
            </CardContent>
            {props.btnText
              ? <CardActions className={cardActions}>
                <Button data-testid='pokemon-card-button' color='primary'>{props.btnText}</Button>
              </CardActions>
              : null}
          </Card>
        </Link>
        : null}
    </div>
  )
}

export default PokemonCard
