import * as React from 'react'
import { Link } from 'gatsby'
import { Button } from '@material-ui/core'
import SimplifiedHeader from '../components/SimpleHeader'

// styles
const pageStyles = {
  color: '#232129',
  fontFamily: '-apple-system, Roboto, sans-serif, serif'
}

const paragraphStyles = {
  marginBottom: 24
}

// markup
const NotFoundPage = () => {
  return (
    <main style={pageStyles}>
      <SimplifiedHeader title='404 Page not found' />
      <title>Not found</title>
      <p style={paragraphStyles}>
        Looks like you've taken a wrong turn
        <span role='img' aria-label='Pensive emoji'>
          😔
        </span>{' '}
      </p>
      <Link to='/'>
        <Button variant='contained' color='secondary'>
          Click here to see Pokemon
        </Button>
      </Link>
    </main>
  )
}

export default NotFoundPage
