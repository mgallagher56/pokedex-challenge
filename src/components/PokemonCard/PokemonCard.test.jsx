import React from 'react'
import { render, cleanup } from '@testing-library/react'
import PokemonCard from './PokemonCard'

describe('PokemonCard Component', () => {
  afterEach(cleanup)

  it('renders PokemonCard Component', () => {
    render(<PokemonCard link='/' />)
  })

  it('should take a snapshot', () => {
    const { asFragment } = render(<PokemonCard link='/' />)
    expect(asFragment(<PokemonCard link='/' />)).toMatchSnapshot()
  })

  it('should have Hello world title', () => {
    const { getByTestId } = render(<PokemonCard link='/' title='Hello world' />)
    expect(getByTestId('pokemon-card-title')).toMatchInlineSnapshot(`
    <h2
      class="MuiTypography-root makeStyles-cardTitle-10 MuiTypography-h5"
      data-testid="pokemon-card-title"
    >
      Hello world
    </h2>
    `)
  })

  it('should have a title', () => {
    const { queryByTestId } = render(<PokemonCard link='/' title='title text' />)
    expect(queryByTestId('pokemon-card-title')).toBeTruthy()
  })

  it('should not have a title', () => {
    const { queryByTestId } = render(<PokemonCard link='/' />)
    expect(queryByTestId('pokemon-card-title')).toBeNull()
  })

  it('should have a description', () => {
    const { queryByTestId } = render(<PokemonCard link='/' description='lorem ipsum' />)
    expect(queryByTestId('pokemon-card-description')).toBeTruthy()
  })

  it('should not have a description', () => {
    const { queryByTestId } = render(<PokemonCard link='/' />)
    expect(queryByTestId('pokemon-card-description')).toBeNull()
  })

  it('should have a button', () => {
    const { queryByTestId } = render(<PokemonCard link='/' btnText='Go back' />)
    expect(queryByTestId('pokemon-card-button')).toBeTruthy()
  })

  it('should not have a button', () => {
    const { queryByTestId } = render(<PokemonCard link='/' />)
    expect(queryByTestId('pokemon-card-button')).toBeNull()
  })

  it('should be a link', () => {
    const { getByText } = render(<PokemonCard link='/pokemon' title='test' />)
    expect(document.querySelector('a').getAttribute('href')).toBe('/pokemon')
  })

  it('should not exist', () => {
    const { queryByTestId } = render(<PokemonCard />)
    expect(queryByTestId('pokemon-card-link')).toBeNull()
  })
})
