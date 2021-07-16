import * as React from 'react'
import ListPokemons from '../components/ListPokemons'
import Seo from '../components/Seo'

const IndexPage = () => {
  return (
    <main>
      <Seo />
      <ListPokemons />
    </main>
  )
}

export default IndexPage
