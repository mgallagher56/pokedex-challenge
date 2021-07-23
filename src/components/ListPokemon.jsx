import React, { useState } from 'react'
import { getImage } from 'gatsby-plugin-image'
import { useDebouncedCallback } from 'use-debounce'
import { makeStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { TextField } from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'
import PokemonCard from './PokemonCard/PokemonCard'

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

/**
 * ListPokemon renders a grid of pokemon with search and pagination
 *
 * Props:
 *
 * itemsPerPage - sets number of items to display per page
 *
 * data - object of objects with keys of id, name, image, remoteImage
 *
 * used to render cards in grid
 */
const ListPokemon = (props) => {
  // set initial variables to be used in component
  const { data, itemsPerPage } = props
  const initialPagePokemon = data.slice(0, itemsPerPage)

  /**
  * calculatePages calcultes total pages for given items and page size
  *
  * Params:
  *
  * items - total number of items to display
  *
  * itemsPerPage - number of items to show per page
  *
  * return: number of pages used for pagination
  */
  const calculatePages = (items, itemsPerPage) => {
    return Math.ceil(items.length / itemsPerPage)
  }

  // set initial values for state object
  const [state, setState] = useState({
    searchInput: '',
    filteredItems: [],
    totalPages: calculatePages(data, itemsPerPage),
    currentPage: 1,
    itemsToShow: initialPagePokemon
  })

  /**
  * resetCards returns cards and search to orginal state
  */
  const resetCards = () => {
    setState({
      searchInput: '',
      filteredItems: [],
      totalPages: calculatePages(data, itemsPerPage),
      currentPage: 1,
      itemsToShow: initialPagePokemon
    })
  }

  /**
   * handlePageChange pulls in next paginated item list
   *
   * Params:
   *
   * items - array of items to search
   *
   * attribute - name of item attribute to search
   *
   * searchValue - string to filter items by
   *
   * return array of items matchiung search string
   *
   */
  const handlePageChange = (newPageNum, itemsPerPage, currentSearchInput, filteredItems) => {
    const offset = (newPageNum - 1) * itemsPerPage

    const itemsToPaginate = currentSearchInput === ''
      ? data
      : filteredItems

    return itemsToPaginate.slice(offset).slice(0, itemsPerPage)
  }

  /**
  * filterItems searchs through items by name
  *
  * Params:
  *
  * items - array of items to search
  *
  * attribute - name of item attribute to search
  *
  * searchValue - string to filter items by
  *
  * return array of items matchiung search string
  *
  */
  const filterItemsByName = (items, attribute, searchValue) => {
    return items.filter((item) => {
      if (item[attribute].includes(searchValue.toLowerCase())) {
        return item
      }
      return null
    })
  }

  /**
  * handleItemSearch controls items to hide/show when searching.
  *
  * resets cards if searchValue is empty
  *
  * Params:
  *
  * searchValue - string to filter items by
  *
  */
  const handleItemSearch = (searchValue) => {
    if (searchValue === '') {
      resetCards()
    } else {
      const filteredItemsArr = filterItemsByName(data, 'name', searchValue)

      setState({
        ...state,
        filteredItems: filteredItemsArr,
        totalPages: calculatePages(filteredItemsArr, itemsPerPage),
        currentPage: 1,
        itemsToShow: filteredItemsArr.slice(0).slice(0, itemsPerPage)
      })
    }
  }

  /**
  * debounced decreases resource use when listening for search event
  *
  * Params:
  *
  * value - value to pass to callback function
  *
  */
  const debounced = useDebouncedCallback(value => {
    handleItemSearch(value)
  }, 150)

  // destructure styles for better legibility
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
        id='search-bar'
        className={`${input}`}
        label='Search Pokemon'
        type='search'
        value={state.searchInput}
        onChange={(e) => {
          setState({
            ...state,
            searchInput: e.target.value
          })
          debounced(state.searchInput)
        }}
      />
      {/* show dialog to reset searcg when no items found */
        state.itemsToShow.length === 0
          ? <div className={searchError}>
            <Typography variant='h5' component='h5' className={searchError}>
              Opps! Looks like your search didn't catch any Pokemon
            </Typography>
            <Button
              variant='contained'
              color='secondary'
              className={searchError}
              onClick={() => handleItemSearch('')}
            >
              Catch EM' ALl
            </Button>
          </div>
          : null
      }
      <Grid container spacing={4}>
        {/* loop through available itmes and display as cards */
          state.itemsToShow.map(pokemon => {
            const { pokemonNumber, name, image, remoteImage } = pokemon
            const gatsbyImg = getImage(remoteImage)
            return (
              <React.Fragment key={pokemonNumber}>
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
          })
        }
      </Grid>
      {/* hide pagination when no pages available */
        state.totalPages !== 0
          ? <Pagination
              className={pagination}
              count={state.totalPages}
              page={state.currentPage}
              color='secondary'
              onChange={(e, page) => setState({
                ...state,
                currentPage: page,
                itemsToShow: handlePageChange(page, itemsPerPage, state.searchInput, state.filteredItems)
              })}
            />
          : null
        }
    </Container>
  )
}
export default ListPokemon
