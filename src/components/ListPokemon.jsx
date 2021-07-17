import React, { useState } from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { useDebouncedCallback } from 'use-debounce'
import { makeStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { TextField } from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'

// styles
const useStyles = makeStyles((theme) => ({
  input: {
    paddingBottom: theme.spacing(8),
    width: '100%'
  },
  cardGrid: {
    paddingBottom: theme.spacing(8),
    paddingTop: theme.spacing(8)
  },
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
    paddingTop: '100%',
    [theme.breakpoints.down('xs')]: {
      backgroundSize: 'contain',
      height: '100px',
      paddingTop: '0',
      width: '33%'
    }
  },
  cardContent: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center'
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: theme.spacing(8),
    paddingTop: theme.spacing(8)
  },
  searchError: {
    textAlign: 'center',
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2)
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
            image {
              url
            }
          }
        }
      }
    }
    `
  )
  const paginatedResults = pokemonData.nodes
  const allPokemon = []
  paginatedResults.map(page => {
    page.results.map(pokemon => {
      return allPokemon.push(pokemon)
    })
    return allPokemon
  })

  const filterPokemonList = (searchValue, allPokemonList) => {
    return allPokemonList.filter((pokemon) => {
      if (pokemon.name.includes(searchValue)) {
        return pokemon
      }
      return null
    })
  }

  const numberOfPages = (pokemonList) => {
    const pokemonNum = pokemonList.length
    return pokemonNum % 20 === 0 ? pokemonNum / 20 : (pokemonNum / 20) + 1
  }

  const [filteredPokemon, setFilteredPokemon] = useState(allPokemon)
  const [pages, setPages] = useState(numberOfPages(allPokemon))

  const filterPokemonCards = (filterValue) => {
    const filteredPokemon = filterPokemonList(filterValue, allPokemon)
    setFilteredPokemon(filteredPokemon)
    setPages(numberOfPages(filteredPokemon))
  }

  const resetSearchHandler = () => {
    filterPokemonCards('')
    document.getElementById('pokemon-search').value = ''
  }

  const debounceFilter = useDebouncedCallback((value) => {
    filterPokemonCards(value)
  }, 150)

  const {
    input,
    cardGrid,
    card,
    cardTitle,
    cardMedia,
    cardContent,
    pagination,
    searchError
  } = useStyles()

  // markup
  return (
    <Container className={cardGrid} maxWidth='md'>
      <TextField
        id='pokemon-search'
        className={input}
        label='Search'
        type='search'
        onChange={(e) => debounceFilter(e.target.value)}
      />
      {pages === 0
        ? <div className={searchError}>
          <Typography variant='h5' component='h5' className={searchError}>
            Opps! Looks like your search didn't catch any Pokemon
          </Typography>
          <Button
            variant='contained'
            color='secondary'
            className={searchError}
            onClick={() => resetSearchHandler()}
          >
            Catch EM' ALl
          </Button>
        </div>
        : null}
      <Grid container spacing={4}>
        {filteredPokemon.map(pokemon => {
          const { id, name, image } = pokemon
          return (
            <React.Fragment key={id}>
              <Grid id={pokemon.name} item xs={12} sm={4} md={3}>
                <Link to={`/pokemon/${name}`}>
                  <Card className={card}>
                    <CardMedia
                      className={cardMedia}
                      image={image.url}
                      title='Image title'
                    />
                    <CardContent className={cardContent}>
                      <Typography variant='h5' component='h5' className={cardTitle}>
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
        })}
      </Grid>
      {pages !== 0
        ? <Pagination className={pagination} count={pages} color='secondary' />
        : null}
    </Container>
  )
}
export default ListPokemon
