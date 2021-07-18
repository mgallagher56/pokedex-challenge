import React from "react"
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
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    transition: 'all .3s ease-out',
    transitionProperty: 'box-shadow, transform',
    '&:hover': {
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
      transform: 'translate3d(0px, -2px, 0px)'
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'row',
      maxHeight: '100px'
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
    alignItems: 'center'
  }
}))

const PokemonCard = (props) => {
  const {
    card,
    cardTitle,
    cardMedia,
    cardContent
  } = useStyles()

  return (
    <Link to={props.link}>
      <Card className={card}>
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
          <Typography variant='h5' component='h5' className={cardTitle}>
            {props.title}
          </Typography>
        </CardContent>
        <CardActions>
          <Button color='primary'>
            {props.btnText}
          </Button>
        </CardActions>
      </Card>
    </Link>
  )
}

export default PokemonCard
