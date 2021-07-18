import * as React from 'react'
import ListPokemonData from '../components/ListPokemon'
import Seo from '../components/Seo'
import SimplifiedHeader from '../components/SimpleHeader';

const IndexPage = () => {
  return (
    <main>
      <Seo />
      <SimplifiedHeader title='Pokedex' />
      <ListPokemonData />
    </main>
  )
}

export default IndexPage
