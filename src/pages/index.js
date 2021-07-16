import * as React from 'react'
import ListPokemonData from '../components/ListPokemon'
import Seo from '../components/Seo'

const IndexPage = () => {
  return (
    <main>
      <Seo />
      <ListPokemonData />
    </main>
  )
}

export default IndexPage
