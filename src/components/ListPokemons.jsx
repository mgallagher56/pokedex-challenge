import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
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

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
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
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  }
}))

const ListPokemons = () => {
  const { pokemonData } = useStaticQuery(
    graphql`
    query pokemonList {
      pokemonData {
        pokemons {
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

  const classes = useStyles()
  return (
    <Container className={classes.cardGrid} maxWidth='md'>
      <Grid container spacing={4}>
        {pokemonData.pokemons.map(page => {
          return (
            page.results.map(pokemon => {
              console.log(pokemon)
              return (
                <React.Fragment key={pokemon.id}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                      <CardMedia
                        className={classes.cardMedia}
                        image={pokemon.image}
                        title='Image title'
                      />
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant='h4' component='h4' className={classes.cardTitle}>
                          {pokemon.name}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button color='primary'>
                          View details
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                </React.Fragment>
              )
            })
          )
        })}
      </Grid>
      <Pagination count={10} color='secondary' />
    </Container>
  )
}
export default ListPokemons
