import * as React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Pagination from '@material-ui/lab/Pagination'
// import Link from '@material-ui/core/Link'

// styles
const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all .3s ease-out',
    transitionProperty: 'box-shadow, transform',
    '&:hover': {
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
      transform: 'translate3d(0px, -2px, 0px)'
    }
  },
  cardTitle: {
    textTransform: 'capitalize'
  },
  cardMedia: {
    paddingTop: '100%'
  },
  cardContent: {
    flexGrow: 1
  },
  pagination: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    display: 'flex',
    justifyContent: 'center'
  }
}))

// query
const ListPokemon = () => {
  const { pokemonData } = useStaticQuery(
    graphql`
      query pokemonList {
        pokemonData {
          nodes {
            results {
              name
              id
              image
            }
          }
        }
      }
    `
  )

  console.log(pokemonData)

  const {
    cardGrid,
    card,
    cardTitle,
    cardMedia,
    cardContent,
    pagination
  } = useStyles()
  // markup
  return (
    <Container className={cardGrid} maxWidth='md'>
      <Grid container spacing={4}>

        {pokemonData.nodes.map(page => {
          return (
            page.results.map(pokemon => {
              const { id, name, image } = pokemon
              return (
                <React.Fragment key={id}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Link to={`/pokemon/${name}`}>
                      <Card className={card}>
                        <CardMedia
                          className={cardMedia}
                          image={image}
                          title='Image title'
                        />
                        <CardContent className={cardContent}>
                          <Typography gutterBottom variant='h4' component='h4' className={cardTitle}>
                            {name}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button color='primary'>
                            View details
                          </Button>
                        </CardActions>
                      </Card>
                    </Link>
                  </Grid>
                </React.Fragment>
              )
            })
          )
        })}
      </Grid>
      <Pagination className={pagination} count={10} color='secondary' />
    </Container>
  )
}
export default ListPokemon
