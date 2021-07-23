import React from 'react'
import { render, cleanup } from '@testing-library/react'
import PokemonDetailCard from './PokemonDetailCard'

describe('PokemonDetailCard Component', () => {
  afterEach(cleanup)

  it('renders PokemonDetailCard Component', () => {
    render(<PokemonDetailCard />)
  })

  it('should take a snapshot', () => {
    const { asFragment } = render(<PokemonDetailCard />)
    expect(asFragment(<PokemonDetailCard />)).toMatchSnapshot()
  })

  it('should have Hello world title', () => {
    const { getByTestId } = render(<PokemonDetailCard title='Hello world' />)
    expect(getByTestId('pokemon-detail-card-title')).toMatchInlineSnapshot(`
    <h2
      class="MuiTypography-root makeStyles-cardTitle-8 MuiTypography-h5"
      data-testid="pokemon-detail-card-title"
    >
      Hello world
    </h2>
    `)
  })

  it('should have a title', () => {
    const { queryByTestId } = render(<PokemonDetailCard title='title text' />)
    expect(queryByTestId('pokemon-detail-card-title')).toBeTruthy()
  })

  it('should not have a title', () => {
    const { queryByTestId } = render(<PokemonDetailCard />)
    expect(queryByTestId('pokemon-detail-card-title')).toBeNull()
  })

  it('should have a description', () => {
    const { queryByTestId } = render(<PokemonDetailCard description='lorem ipsum' />)
    expect(queryByTestId('pokemon-detail-card-description')).toBeTruthy()
  })

  it('should not have a description', () => {
    const { queryByTestId } = render(<PokemonDetailCard />)
    expect(queryByTestId('pokemon-detail-card-description')).toBeNull()
  })
})
