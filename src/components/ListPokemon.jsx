import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { getImage } from 'gatsby-plugin-image'
import { useDebouncedCallback } from 'use-debounce'
import { makeStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { TextField } from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'
import PokemonCard from './PokemonCard'

// styles
const useStyles = makeStyles((theme) => ({
  input: {
    marginBottom: theme.spacing(8),
    width: '100%'
  },
  cardGrid: {
    paddingBottom: theme.spacing(8),
    paddingTop: theme.spacing(8)
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
  const data = useStaticQuery(graphql`
  query PokemonQuery {
    allPokemon(limit: 151) {
      nodes {
        name
        id
        image
        remoteImage {
          childImageSharp {
            gatsbyImageData(
              width: 200
              formats: [WEBP, AVIF, AUTO]
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
  const itemsPerPage = 20
  const initialPagePokemon = allPokemon.slice(0, itemsPerPage)

  const numberOfPages = (items) => {
    return Math.ceil(items.length / itemsPerPage)
  }

  const [state, setState] = useState({
    searchInput: '',
    searchedPokemon: [],
    totalPages: numberOfPages(allPokemon),
    currentPage: 1,
    pokemonToShow: initialPagePokemon
  })

  const resetCards = () => {
    setState({
      searchInput: '',
      searchedPokemon: [],
      totalPages: numberOfPages(allPokemon),
      currentPage: 1,
      pokemonToShow: initialPagePokemon
    })
  }

  const searchPokemon = (searchValue) => {
    return allPokemon.filter((pokemon) => {
      if (pokemon.name.includes(searchValue)) {
        return pokemon
      }
      return null
    })
  }

  const handlePageChange = (page) => {
    const offset = (page - 1) * itemsPerPage

    const pokemonList = state.searchInput === ''
      ? allPokemon
      : state.searchedPokemon

    return pokemonList.slice(offset).slice(0, itemsPerPage)
  }

  const searchPokemonCards = (searchValue) => {
    if (searchValue === '') {
      resetCards()
    } else {
      const pokemonSearchResults = searchPokemon(searchValue)
      setState({
        ...state,
        searchInput: searchValue,
        searchedPokemon: pokemonSearchResults,
        totalPages: numberOfPages(pokemonSearchResults),
        currentPage: 1,
        pokemonToShow: pokemonSearchResults.slice(0).slice(0, itemsPerPage)
      })
    }
  }

  const resetSearchHandler = () => {
    resetCards()
    document.getElementById('pokemon-search').value = ''
  }

  const debounceFilter = useDebouncedCallback((value) => {
    searchPokemonCards(value)
  }, 150)

  const {
    input,
    cardGrid,
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
      {state.pokemonToShow.length === 0
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
        {state.pokemonToShow.map(pokemon => {
          const { id, name, image } = pokemon
          const gatsbyImg = getImage(pokemon.remoteImage)
          return (
            <React.Fragment key={id}>
              <Grid id={name} item xs={12} sm={4} md={3}>
                <PokemonCard
                  link={`/pokemon/${name}`}
                  gatsbyImg={gatsbyImg}
                  fallbackImg={image}
                  title={name}
                  btnText='View details'
                />
              </Grid>
            </React.Fragment>
          )
        })}
      </Grid>
      {state.totalPages !== 0
        ? <Pagination
            className={pagination}
            count={state.totalPages}
            page={state.currentPage}
            color='secondary'
            onChange={(e, page) => setState({
              ...state,
              currentPage: page,
              pokemonToShow: handlePageChange(page)
            })}
          />
        : null}
    </Container>
  )
}
export default ListPokemon
